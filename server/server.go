package server

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"github.com/mrod502/finviz"
	gocache "github.com/mrod502/go-cache"
	"github.com/mrod502/logger"
	"github.com/mrod502/openinsider"
	"github.com/mrod502/reddit"
)

type RouterConfig struct {
	CacheExpiration time.Duration `yaml:"cache_expiration"`
	Port            uint16        `yaml:"port"`
}
type Router struct {
	r    *mux.Router
	ob   *gocache.Cache[interface{}, string]
	obc  *gocache.Cache[int, string]
	log  logger.Client
	red  *reddit.Client
	fin  *finviz.Client
	oi   openinsider.Client
	u    *websocket.Upgrader
	port uint16
}

func (s *Router) Serve() error {
	return http.ListenAndServe(fmt.Sprintf(":%d", s.port), s.r)
}

func NewRouter(cfg RouterConfig, log logger.Client) (*Router, error) {
	fcli, err := finviz.New(finviz.NewOptions().WithCacheDuration(cfg.CacheExpiration))
	if err != nil {
		return nil, err
	}

	oi, _ := openinsider.NewClient(openinsider.Options{
		Ttl: cfg.CacheExpiration,
	})

	r := &Router{
		r:    mux.NewRouter(),
		log:  log,
		red:  reddit.NewClient(cfg.CacheExpiration),
		fin:  fcli,
		port: cfg.Port,
		oi:   oi,
		ob:   gocache.New[interface{}, string](),
		obc:  gocache.New[int, string](),
	}
	r.createUpgrader()

	r.setupRoutes()
	return r, nil
}

func (s *Router) withLogging(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		s.log.Write(r.Method, r.RequestURI)
		h.ServeHTTP(w, r)
	})
}

func (s *Router) serveSubreddits(w http.ResponseWriter, r *http.Request) {
	v, ok := mux.Vars(r)["sub"]

	if !ok {
		http.Error(w, "invalid URI", http.StatusBadRequest)
		return
	}

	sr, err := s.red.GetSubreddit(v)
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		s.log.Write("ERR", "subreddit", "getsub", v, r.RemoteAddr, err.Error())
		return
	}

	b, err := json.Marshal(sr)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		s.log.Write("ERR", "subreddit", "marshal", r.RemoteAddr, err.Error())
		return
	}
	s.createHeaders(w)
	_, err = w.Write(b)
	if err != nil {
		s.log.Write("ERR", "subreddit", "write", r.RemoteAddr, err.Error())
	}

}

func (s *Router) serveFinvizNews(w http.ResponseWriter, r *http.Request) {

}

func (s *Router) serveFinvizNewsArticles(w http.ResponseWriter, r *http.Request) {

}
func (s *Router) setupRoutes() {
	s.r.HandleFunc("/reddit/{sub}", s.serveSubreddits).Methods(http.MethodGet)
	s.r.HandleFunc("/reddit/{sub}/{msgId}", s.serveReplies).Methods(http.MethodGet)
	s.r.HandleFunc("/finviz", s.serveFinvizHome)
	s.r.HandleFunc("/finviz/news", s.serveFinvizNews)
	s.r.HandleFunc("/finviz/news/articles", s.serveFinvizNewsArticles)
	s.r.HandleFunc("/open-insider", s.serveClusterBuys)
	s.r.HandleFunc("/open-insider/screener", s.serveOiScreener)
	s.r.Use(s.withLogging)

}

func (s *Router) addOrderbookListener(w http.ResponseWriter, r *http.Request) error {
	conn, err := s.u.Upgrade(w, r, nil)
	if err != nil {
		return err
	}
	s.ob.Set(r.RemoteAddr, conn)
	return nil
}

func (s *Router) serveReplies(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	sub, ok1 := vars["sub"]
	msgid, ok2 := vars["sub"]
	if !gocache.And(ok1, ok2) {
		http.Error(w, "invalid URI", http.StatusBadRequest)
		s.log.Write("REPLIES", "invalidURI", r.RemoteAddr, r.URL.EscapedPath())
		return
	}

	replies, err := s.red.GetPostReplies(sub, msgid)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		s.log.Write("REPLIES", "fail-get", err.Error(), r.RemoteAddr, r.URL.EscapedPath())
		return
	}
	b, err := json.Marshal(replies)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		s.log.Write("REPLIES", "unmarshal", err.Error(), r.RemoteAddr, r.URL.EscapedPath())
		return
	}
	_, err = w.Write(b)
	if err != nil {
		s.log.Write("REPLIES", "WRITE", err.Error(), r.RemoteAddr, r.URL.EscapedPath())
	}

}

func (s *Router) serveFinvizHome(w http.ResponseWriter, r *http.Request) {
	s.createHeaders(w)
	v, err := s.fin.Home()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	b, err := json.Marshal(v)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		s.log.Write("ERR", "finviz", "marshal", r.RemoteAddr, err.Error())
		return
	}
	if _, err = w.Write(b); err != nil {
		s.log.Write("ERR", "finviz", "write", r.RemoteAddr, err.Error())
	}
}

func (s *Router) createHeaders(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
}

func (s *Router) serveClusterBuys(w http.ResponseWriter, r *http.Request) {

	ds, err := s.oi.LatestClusterBuys()
	if err != nil {
		s.log.Write("ERR", "ClusterBuys", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	b, err := json.Marshal(ds)
	if err != nil {
		s.log.Write("ERR", "ClusterBuys", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if _, err = w.Write(b); err != nil {
		s.log.Write(prefix(r), "write", err.Error())
	}

}

func (s *Router) serveOiScreener(w http.ResponseWriter, r *http.Request) {
	var f = new(openinsider.Filter)

	ds, err := s.oi.Screen(f)
	if err != nil {
		s.log.Write("ERR", "Screen", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	b, err := json.Marshal(ds)
	if err != nil {
		s.log.Write("ERR", "Screen", err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	_, err = w.Write(b)
	if err != nil {
		s.log.Write(prefix(r), "write", err.Error())
	}

}

func prefix(r *http.Request) string {
	return r.RemoteAddr + " " + r.URL.EscapedPath()
}

func (s *Router) createUpgrader() {
	s.u = &websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		Error: func(w http.ResponseWriter, r *http.Request, status int, reason error) {
			s.log.Write(prefix(r), reason.Error())
		},
		EnableCompression: true,
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}
}

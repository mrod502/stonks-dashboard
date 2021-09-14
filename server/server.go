package server

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/mrod502/finviz"
	gocache "github.com/mrod502/go-cache"
	"github.com/mrod502/logger"
	"github.com/mrod502/reddit"
)

type RouterConfig struct {
	CacheExpiration time.Duration `yaml:"cache_expiration"`
	Port            uint16        `yaml:"port"`
}
type Router struct {
	r     *mux.Router
	cache *gocache.InterfaceCache
	log   logger.Client
	red   *reddit.Client
	fin   *finviz.Client
	port  uint16
}

func (s *Router) Serve() error {
	return http.ListenAndServe(fmt.Sprintf(":%d", s.port), s.r)
}

func NewRouter(cfg RouterConfig, log logger.Client) (*Router, error) {
	fcli, err := finviz.NewClient(finviz.NewOptions().WithCacheDuration(cfg.CacheExpiration))
	if err != nil {
		return nil, err
	}

	r := &Router{
		r:     mux.NewRouter(),
		cache: gocache.NewInterfaceCache(),
		log:   log,
		red:   reddit.NewClient(cfg.CacheExpiration),
		fin:   fcli,
		port:  cfg.Port,
	}
	if cfg.CacheExpiration > 0 {
		logger.Info("CACHE DURATION", fmt.Sprintf("%v", cfg.CacheExpiration))
		r.cache.WithExpiration(cfg.CacheExpiration)
	}
	r.setupRoutes()
	return r, nil
}

func (s *Router) serveSubreddits(w http.ResponseWriter, r *http.Request) {
	s.log.Write("GET", "subreddit", r.RemoteAddr, r.URL.EscapedPath())
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

func (s *Router) setupRoutes() {
	s.r.HandleFunc("/reddit/{sub}", s.serveSubreddits).Methods(http.MethodGet)
	s.r.HandleFunc("/reddit/{sub}/{msgId}", s.serveReplies).Methods(http.MethodGet)
	s.r.HandleFunc("/finviz-home", s.serveFinvizHome)
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
	s.log.Write("GET", "finviz", r.RemoteAddr)
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

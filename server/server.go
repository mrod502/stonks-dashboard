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
	s.aggRedditData([]string{"wallstreetbets"})
	go s.scrapeReddit()
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
		red:   reddit.NewClient(),
		fin:   fcli,
		port:  cfg.Port,
	}
	if cfg.CacheExpiration > 0 {
		r.cache.WithExpiration(cfg.CacheExpiration)
	}
	r.setupRoutes()
	return r, nil
}

func (s *Router) aggRedditData(boards []string) {
	for _, v := range boards {
		s.red.AddSub(v)
	}
}

func (s *Router) serveSubreddits(w http.ResponseWriter, r *http.Request) {

}

func (s *Router) setupRoutes() {
	s.r.HandleFunc("/reddit", s.serveSubreddits).Methods(http.MethodGet)
	s.r.HandleFunc("/finviz-home-table", s.serveFinvizHomeTable)
}

func (s *Router) serveFinvizHomeTable(w http.ResponseWriter, r *http.Request) {
	v, err := s.fin.Home()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	b, err := json.Marshal(v.Signals.Items)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		s.log.WriteLog("finviz", "write", err.Error())
		return
	}
	w.Write(b)
}

func (s *Router) scrapeReddit() {
	for {
		time.Sleep(time.Minute)
		s.red.Refresh()
	}
}

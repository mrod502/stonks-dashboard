package main

import (
	"flag"

	"github.com/mrod502/logger"
	"github.com/mrod502/stonks-dashboard/config"
	"github.com/mrod502/stonks-dashboard/server"
)

var (
	log logger.Client
)

func main() {
	var cfg *config.Config
	var err error
	var configPath = flag.String("cfg", "config.yml", "the config file")

	flag.Parse()

	cfg, err = new(config.Config).FromFile(*configPath)

	if err != nil {
		panic(err)
	}
	log, err = logger.NewClient(cfg.ClientConfig)
	if err != nil {
		panic(err)
	}

	log.SetLogLocally(true)
	log.WriteLog("STONKS", "initializing...")
	router, err := server.NewRouter(server.RouterConfig{}, log)
	if err != nil {
		panic(err)
	}

	router.Serve()
}

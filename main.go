package main

import (
	"flag"
	"fmt"

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
	fmt.Println("config path", *configPath)
	cfg, err = new(config.Config).FromFile(*configPath)
	fmt.Printf("%+v\n", *cfg)
	if err != nil {
		panic(err)
	}
	log, err = logger.NewClient(cfg.ClientConfig)
	if err != nil {
		panic(err)
	}

	log.SetLogLocally(true)
	log.Write("STONKS", "initializing...")
	err = log.Connect()
	if err != nil {
		panic(err)
	}
	router, err := server.NewRouter(cfg.RouterConfig, log)
	if err != nil {
		panic(err)
	}
	fmt.Println("serving")
	router.Serve()
}

package config

import (
	"fmt"
	"io/ioutil"
	"time"

	"github.com/mrod502/logger"
	"gopkg.in/yaml.v3"
)

type Config struct {
	logger.ClientConfig
}

func (c *Config) FromFile(path string) (*Config, error) {

	b, err := ioutil.ReadFile(path)
	if err != nil {
		return c, err
	}
	err = yaml.Unmarshal(b, c)
	return c, err
}

func (c *Config) Watch(file string) {
	for {
		b, err := ioutil.ReadFile(file)
		if err != nil {
			return
		}
		err = yaml.Unmarshal(b, c)
		if err != nil {
			fmt.Println("CONFIG:", err)
		}
		time.Sleep(20 * time.Second)

	}
}

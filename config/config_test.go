package config

import (
	"testing"

	"github.com/mrod502/logger"
)

func TestUnmarshal(t *testing.T) {
	var cfg *Config = new(Config)

	var want = Config{
		logger.ClientConfig{
			BaseConfig: logger.BaseConfig{
				Port:            1234,
				EnableWebsocket: true,
				EnableTLS:       true,
			},
			APIKey:     "abcdefgh",
			Prefix:     "test",
			RemoteIP:   "127.0.0.1",
			LogLocally: true,
		},
	}
	cfg.FromFile("config_test.yml")

	if !(want == *cfg) {
		t.Fatalf("unexpected config value:\nexpected:\n%+v\ngot:\n%+v", want, *cfg)
	}
}

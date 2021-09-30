package main

import (
	"net/http"
	"testing"
	"time"

	"github.com/mrod502/stonks-dashboard/server"
)

type fakeLogger struct {
}

func (f *fakeLogger) Write(v ...string) error {
	return nil
}
func (f *fakeLogger) Connect() error {
	return nil
}
func (f *fakeLogger) LogLocally() bool {
	return false
}
func (f *fakeLogger) SetLogLocally(v bool) {

}
func TestConcurrency(t *testing.T) {
	srv, _ := server.NewRouter(server.RouterConfig{
		Port: 1234,
	}, new(fakeLogger))
	go srv.Serve()
	time.Sleep(time.Second)

	for i := 0; i < 50; i++ {
		go func() {
			for {
				http.Get("http://localhost:1234/reddit/wallstreetbets")
				http.Get("http://localhost:1234/finviz-home")

			}
		}()
	}
	time.Sleep(20 * time.Second)
}

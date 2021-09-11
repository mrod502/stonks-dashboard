package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"testing"
	"time"

	"github.com/mrod502/stonks-dashboard/server"
)

type fakeLogger struct {
}

func (f *fakeLogger) WriteLog(v ...string) error {
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
	for i := 0; i < 5; i++ {
		go func() {
			res, _ := http.Get("http://localhost:1234/reddit")
			b, _ := ioutil.ReadAll(res.Body)
			fmt.Println(string(b))
		}()
	}
	time.Sleep(5 * time.Second)
}

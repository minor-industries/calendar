package main

import (
	"embed"
	"github.com/gin-gonic/gin"
	"github.com/minor-industries/calendar/frontend"
	"net/http"
)

//go:embed *.html
var fs embed.FS

func run() error {
	r := gin.Default()

	r.GET("/index.html", func(c *gin.Context) {
		c.FileFromFS("/calendar.html", http.FS(fs))
	})

	r.GET("/calendar/*file", func(c *gin.Context) {
		c.FileFromFS(c.Param("file"), http.FS(frontend.FS))
	})

	return r.Run(":8000")
}

func main() {
	if err := run(); err != nil {
		panic(err)
	}
}

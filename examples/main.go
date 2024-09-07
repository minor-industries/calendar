package main

import (
	"context"
	"embed"
	"github.com/gin-gonic/gin"
	"github.com/minor-industries/calendar"
	"github.com/minor-industries/calendar/gen/go/calendar"
	"net/http"
)

//go:embed *.html static/purecss/*.css
var fs embed.FS

type handler struct{}

func (h handler) GetEvents(ctx context.Context, req *calendar.CalendarEventReq) (*calendar.CalendarEventResp, error) {
	return &calendar.CalendarEventResp{ResultSets: []*calendar.CalendarResultSet{
		{
			Color: "blue",
			Date:  "2024-01-01",
			Query: "abc123",
			Count: 1,
		},
	}}, nil
}

func run() error {
	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		c.Redirect(http.StatusTemporaryRedirect, "index.html")
	})

	r.GET("/index.html", func(c *gin.Context) {
		c.FileFromFS("/calendar.html", http.FS(fs))
	})

	r.GET("/favicon.ico", func(c *gin.Context) {
		c.Status(204)
	})

	r.GET("/calendar/*file", func(c *gin.Context) {
		c.FileFromFS(c.Param("file"), http.FS(frontend.FS))
	})

	r.GET("/static/*file", func(c *gin.Context) {
		c.FileFromFS("/static/"+c.Param("file"), http.FS(fs))
	})

	r.POST(
		"/twirp/calendar.Calendar/*Method",
		gin.WrapH(calendar.NewCalendarServer(&handler{}, nil)),
	)

	return r.Run(":8000")
}

func main() {
	if err := run(); err != nil {
		panic(err)
	}
}

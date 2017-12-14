package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/casperin/pg-amigo/cmd/amigod/api"
	"github.com/casperin/pg-amigo/cmd/amigod/handlers"
	"github.com/casperin/pg-amigo/cmd/amigod/middleware"
	"github.com/go-chi/chi"
	"github.com/gorilla/context"
	"github.com/spf13/viper"
)

func main() {
	r := chi.NewRouter()

	wd, _ := os.Getwd()
	staticPath := filepath.Join(wd, "cmd", "amigod", "static")
	r.Get("/static/{file}", func(w http.ResponseWriter, r *http.Request) {
		file := chi.URLParam(r, "file")
		http.ServeFile(w, r, filepath.Join(staticPath, file))
	})

	r.Get("/login", handlers.Login)
	r.Post("/login", handlers.LoginPost)

	r.Route("/", func(r chi.Router) {
		r.Use(middleware.MustBeLoggedIn)
		r.Get("/*", func(w http.ResponseWriter, r *http.Request) {
			http.ServeFile(w, r, filepath.Join(staticPath, "hyperapp.html"))
		})
	})

	r.Route("/api", func(r chi.Router) {
		r.Use(middleware.MustBeLoggedIn)
		r.Get("/database-server", api.DatabaseServer)
		r.Get("/query/{db}", api.Query)
		r.Get("/tables/{db}", api.Tables)
	})

	port := viper.GetString("port")
	fmt.Printf("Listening on port %v\n", port)
	log.Fatal(http.ListenAndServe(":"+port, context.ClearHandler(r)))
}

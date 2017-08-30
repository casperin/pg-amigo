package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/casperin/pg-amigo/cmd/amigod/handlers"
	"github.com/casperin/pg-amigo/cmd/amigod/middleware"
	"github.com/go-chi/chi"
	"github.com/gorilla/context"
	"github.com/spf13/viper"
)

func main() {
	r := chi.NewRouter()

	// CSS && js
	wd, _ := os.Getwd()
	staticPath := filepath.Join(wd, "cmd", "amigod", "static")
	r.Get("/styles.css", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, filepath.Join(staticPath, "styles.css"))
	})
	r.Get("/hyperhtml.js", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, filepath.Join(staticPath, "hyperhtml.js"))
	})

	r.Get("/login", handlers.Login)
	r.Post("/login", handlers.LoginPost)

	r.Route("/", func(r chi.Router) {
		r.Use(middleware.MustBeConnected)
		r.Use(middleware.MustBeLoggedIn)
		r.Get("/", handlers.Index)

		r.Get("/db/{db}", handlers.Database)
		r.Post("/db/new", handlers.NewDatabase)
		r.Post("/db/delete", handlers.DeleteDatabase)
	})

	port := viper.GetString("port")
	fmt.Printf("Listening on port %v\n", port)
	log.Fatal(http.ListenAndServe(":"+port, context.ClearHandler(r)))
}

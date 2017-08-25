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

	// CSS
	wd, _ := os.Getwd()
	cssPath := filepath.Join(wd, "cmd", "amigod", "static", "styles.css")
	r.Get("/styles.css", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, cssPath)
	})

	r.Route("/", func(r chi.Router) {
		r.Use(middleware.MustBeConnected)
		r.Get("/", handlers.Index)
		r.Get("/db/{db}", handlers.Database)
	})

	port := viper.GetString("port")
	fmt.Printf("Listening on port %v\n", port)
	log.Fatal(http.ListenAndServe(":"+port, context.ClearHandler(r)))
}

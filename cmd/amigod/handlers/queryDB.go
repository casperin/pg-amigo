package handlers

import (
	"net/http"

	"github.com/go-chi/chi"
)

func QueryDB(w http.ResponseWriter, r *http.Request) {
	content := Content{
		"dbName": chi.URLParam(r, "db"),
		"q":      r.FormValue("q"),
	}
	MustServe(w, content, "query-db")
}

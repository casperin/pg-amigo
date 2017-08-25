package handlers

import (
	"net/http"

	"github.com/go-chi/chi"
)

func Database(w http.ResponseWriter, r *http.Request) {
	db := chi.URLParam(r, "db")
	/*
		var tables []string
		err := connection.DB.Select(&tables, "show tables")
		if err != nil {
			MustServeError(w, 500, err)
			return
		}
	*/
	c := Content{
		"db": db,
		// "tables": tables,
	}
	MustServe(w, c, "database")
}

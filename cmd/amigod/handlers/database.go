package handlers

import (
	"net/http"

	"github.com/casperin/pg-amigo/internal/connection"
	"github.com/go-chi/chi"
)

func Database(w http.ResponseWriter, r *http.Request) {
	dbName := chi.URLParam(r, "db")
	db, err := connection.GetDB(dbName)
	if err != nil {
		MustServeError(w, 500, err)
		return
	}
	var tables []string
	err = db.Select(
		&tables,
		// how to do "\d"? It gives syntax error
		`SELECT tablename
		FROM pg_catalog.pg_tables
		WHERE schemaname != 'pg_catalog'
		AND schemaname != 'information_schema'`,
	)
	if err != nil {
		MustServeError(w, 500, err)
		return
	}
	c := Content{
		"dbName": dbName,
		"db":     db,
		"tables": tables,
	}
	MustServe(w, c, "database")
}

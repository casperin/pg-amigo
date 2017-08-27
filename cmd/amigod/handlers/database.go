package handlers

import (
	"net/http"

	"github.com/casperin/pg-amigo/internal/table"
	"github.com/go-chi/chi"
)

func Database(w http.ResponseWriter, r *http.Request) {
	db := chi.URLParam(r, "db")
	tables, err := table.GetTablesOverview(db)
	c := Content{
		"dbName": db,
		"tables": tables,
	}
	MustServeOr500(w, err, c, "database")
}

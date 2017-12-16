package api

import (
	"net/http"

	"github.com/casperin/pg-amigo/internal/connection"
	"github.com/go-chi/chi"
)

type tablesResponse struct {
	Data connection.Tables `json:"data"`
}

func Tables(w http.ResponseWriter, r *http.Request) {
	dbName := chi.URLParam(r, "db")
	conn := connection.New(dbName)
	tables, err := connection.GetTablesOverview(conn, dbName)

	if err != nil {
		serveAsJSON(w, newErrorResponse(err))
		return
	}

	response := tablesResponse{tables}
	serveAsJSON(w, response)
}

package api

import (
	"net/http"

	"github.com/casperin/pg-amigo/internal/connection"
	"github.com/go-chi/chi"
)

func Query(w http.ResponseWriter, r *http.Request) {
	dbName := chi.URLParam(r, "db")
	q := r.FormValue("q")
	conn := connection.New(dbName)
	columns, result, err := connection.QueryDB(conn, q)
	data := struct {
		Columns []string        `json:"columns"`
		Rows    [][]interface{} `json:"rows"`
	}{columns, result}
	serveAsJsonOrError(w, data, err)
}

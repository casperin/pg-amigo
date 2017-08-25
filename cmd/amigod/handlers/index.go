package handlers

import (
	"net/http"

	"github.com/casperin/pg-amigo/internal/connection"
)

func Index(w http.ResponseWriter, r *http.Request) {
	var dbs []string
	err := connection.DB.Select(&dbs, "SELECT datname FROM pg_database WHERE datistemplate = false;")
	if err != nil {
		MustServeError(w, 500, err)
		return
	}
	MustServe(w, Content{"databases": dbs}, "index")
}

package api

import (
	"net/http"

	"github.com/casperin/pg-amigo/internal/connection"
)

func DatabaseServer(w http.ResponseWriter, r *http.Request) {
	db := connection.Pg()
	dbs, err := connection.GetDatabaseNames(db)
	if err != nil {
		serveError(w, 500, err)
		return
	}

	type responseData struct {
		Databases []string `json:"databases"`
	}
	type response struct {
		Data responseData `json:"data"`
	}
	resp := response{responseData{dbs}}

	serveAsJSON(w, resp)
}

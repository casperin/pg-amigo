package api

import (
	"net/http"

	"github.com/casperin/pg-amigo/internal/connection"
)

type databaseServerResponseData struct {
	Databases []string `json:"databases"`
}

type databaseServerResponse struct {
	Data databaseServerResponseData `json:"data"`
}

func DatabaseServer(w http.ResponseWriter, r *http.Request) {
	db := connection.Pg()
	dbs, err := connection.GetDatabaseNames(db)
	if err != nil {
		serveError(w, 500, err)
		return
	}

	resp := databaseServerResponse{databaseServerResponseData{dbs}}

	serveAsJSON(w, resp)
}

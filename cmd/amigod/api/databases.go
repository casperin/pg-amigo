package api

import (
	"net/http"

	"github.com/casperin/pg-amigo/internal/connection"
)

func Databases(w http.ResponseWriter, r *http.Request) {
	db := connection.Pg()
	dbs, err := connection.GetDatabaseNames(db)
	if err != nil {
		serveError(w, 500, err)
		return
	}
	serveAsJSON(w, dbs)
}

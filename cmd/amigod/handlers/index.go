package handlers

import (
	"fmt"
	"net/http"

	"github.com/casperin/pg-amigo/internal/connection"
)

func Index(w http.ResponseWriter, r *http.Request) {
	db := connection.Pg()
	dbs, err := connection.GetDatabaseNames(db)
	c := Content{
		"databases": dbs,
		"error":     r.FormValue("error"),
	}
	MustServeOr500(w, err, c, "index")
}

func NewDatabase(w http.ResponseWriter, r *http.Request) {
	dbName := r.FormValue("dbName")
	db := connection.Pg()
	err := connection.CreateNewDatabase(db, dbName)
	redirctUrl := "/"
	if err != nil {
		// We don't serve 500 here because the error may be that the user is
		// connected to the db from elsewhere.
		redirctUrl += fmt.Sprintf("db/%s?error=%s", dbName, err)
	}
	http.Redirect(w, r, redirctUrl, 302)
}

func DeleteDatabase(w http.ResponseWriter, r *http.Request) {
	db := connection.Pg()
	dbName := r.FormValue("dbName")
	err := connection.DeleteDatabase(db, dbName)
	if err != nil {
		serveError(w, 500, err)
		return
	}
	http.Redirect(w, r, "/", 302)
}

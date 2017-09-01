package handlers

import (
	"fmt"
	"log"
	"net/http"

	"github.com/casperin/pg-amigo/internal/connection"
	"github.com/casperin/pg-amigo/internal/database"
)

func Index(w http.ResponseWriter, r *http.Request) {
	db := connection.Pg()
	dbs, err := database.GetDatabaseNames(db)
	c := Content{
		"databases": dbs,
		"error":     r.FormValue("error"),
	}
	MustServeOr500(w, err, c, "index")
}

func NewDatabase(w http.ResponseWriter, r *http.Request) {
	db := connection.Pg()
	err := database.CreateNewDatabase(db, r.FormValue("dbName"))
	redirctUrl := "/"
	if err != nil {
		log.Println(err)
		redirctUrl += fmt.Sprintf("?error=%s", err)
	}
	http.Redirect(w, r, redirctUrl, 302)
}

func DeleteDatabase(w http.ResponseWriter, r *http.Request) {
	db := connection.Pg()
	err := database.DeleteDatabase(db, r.FormValue("dbName"))
	redirctUrl := "/"
	if err != nil {
		log.Println(err)
		redirctUrl += fmt.Sprintf("?error=%s", err)
	}
	http.Redirect(w, r, redirctUrl, 302)
}

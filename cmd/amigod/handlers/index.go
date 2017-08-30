package handlers

import (
	"fmt"
	"log"
	"net/http"

	"github.com/casperin/pg-amigo/internal/database"
)

func Index(w http.ResponseWriter, r *http.Request) {
	dbs, err := database.GetDatabaseNames()
	c := Content{
		"databases": dbs,
		"error":     r.FormValue("error"),
	}
	MustServeOr500(w, err, c, "index")
}

func NewDatabase(w http.ResponseWriter, r *http.Request) {
	err := database.CreateNewDatabase(r.FormValue("dbName"))
	redirctUrl := "/"
	if err != nil {
		log.Println(err)
		redirctUrl += fmt.Sprintf("?error=%s", err)
	}
	http.Redirect(w, r, redirctUrl, 302)
}

func DeleteDatabase(w http.ResponseWriter, r *http.Request) {
	err := database.DeleteDatabase(r.FormValue("dbName"))
	redirctUrl := "/"
	if err != nil {
		log.Println(err)
		redirctUrl += fmt.Sprintf("?error=%s", err)
	}
	http.Redirect(w, r, redirctUrl, 302)
}

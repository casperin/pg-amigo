package handlers

import (
	"net/http"

	"github.com/casperin/pg-amigo/internal/database"
)

func Index(w http.ResponseWriter, r *http.Request) {
	dbs, err := database.GetDatabaseNames()
	MustServeOr500(w, err, Content{"databases": dbs}, "index")
}

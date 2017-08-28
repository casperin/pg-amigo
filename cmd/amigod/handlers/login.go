package handlers

import (
	"net/http"

	"github.com/casperin/pg-amigo/internal/session"
	"github.com/spf13/viper"
)

func Login(w http.ResponseWriter, r *http.Request) {
	MustServe(w, Content{"error": r.FormValue("error")}, "login")
}

func LoginPost(w http.ResponseWriter, r *http.Request) {
	if r.FormValue("password") != viper.GetString("app_password") {
		http.Redirect(w, r, "/login?error=Wrong password, sorry.", 302)
		return
	}
	err := session.Login(w, r)
	if err != nil {
		MustServeError(w, 500, err)
		return
	}
	http.Redirect(w, r, "/", 302)
}

package middleware

import (
	"net/http"

	"github.com/casperin/pg-amigo/internal/session"
	"github.com/spf13/viper"
)

func isLoggedIn(r *http.Request) bool {
	// If no password is set in config, then ignore this requirement
	if viper.GetString("app_password") == "" {
		return true
	}
	if ok, err := session.IsLoggedIn(r); ok && err == nil {
		return true
	}
	return false
}

func MustBeLoggedIn(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if isLoggedIn(r) {
			next.ServeHTTP(w, r)
			return
		}
		http.Redirect(w, r, "/login", 302)
	})
}

func MustBeLoggedInApi(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if isLoggedIn(r) {
			next.ServeHTTP(w, r)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(403)
		w.Write([]byte("{\"error\": \"You are not logged in.\"}"))
	})
}

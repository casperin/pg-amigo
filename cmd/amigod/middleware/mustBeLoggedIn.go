package middleware

import (
	"net/http"

	"github.com/casperin/pg-amigo/internal/session"
	"github.com/spf13/viper"
)

func MustBeLoggedIn(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// If no password is set in config, then ignore this requirement
		if viper.GetString("app_password") == "" {
			next.ServeHTTP(w, r)
			return
		}

		if ok, err := session.IsLoggedIn(r); ok && err == nil {
			next.ServeHTTP(w, r)
			return
		}

		http.Redirect(w, r, "/login", 302)
	})
}

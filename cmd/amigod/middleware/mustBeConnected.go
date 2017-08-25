package middleware

import (
	"net/http"

	"github.com/casperin/pg-amigo/cmd/amigod/handlers"
	"github.com/casperin/pg-amigo/internal/connection"
)

func MustBeConnected(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if connection.Error != nil {
			handlers.MustServeError(w, 500, connection.Error)
			return
		}
		next.ServeHTTP(w, r)
	})
}

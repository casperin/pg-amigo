package api

import (
	"encoding/json"
	"net/http"
)

type errorResponse struct {
	Data errorResponseData `json:"data"`
}

type errorResponseData struct {
	Error string `json:"error"`
}

func serveError(w http.ResponseWriter, code int, err error) {
	w.WriteHeader(500)
	w.Write([]byte(err.Error()))
}

func serveAsJSON(w http.ResponseWriter, data interface{}) {
	b, err := json.Marshal(data)
	if err != nil {
		serveError(w, 500, err)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	_, err = w.Write(b)
	if err != nil {
		serveError(w, 500, err)
	}
}

func serveAsJsonOrError(w http.ResponseWriter, data interface{}, err error) {
	if err != nil {
		serveError(w, 500, err)
		return
	}
	serveAsJSON(w, data)
}

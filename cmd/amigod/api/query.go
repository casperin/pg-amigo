package api

import (
	"fmt"
	"net/http"

	"github.com/casperin/pg-amigo/internal/connection"
	"github.com/go-chi/chi"
)

type queryResponse struct {
	Data queryResponseData `json:"data"`
}

type queryResponseData struct {
	Schema []queryResponseColumn `json:"schema"`
	Values [][]string            `json:"values"`
}

type queryResponseColumn struct {
	Name string `json:"name"`
}

type errorResponse struct {
	Data errorResponseData `json:"data"`
}

type errorResponseData struct {
	Error string `json:"error"`
}

func Query(w http.ResponseWriter, r *http.Request) {
	dbName := chi.URLParam(r, "db")
	q := r.FormValue("q")
	fmt.Println(dbName, q)
	conn := connection.New(dbName)
	columns, result, err := connection.QueryDB(conn, q)

	if err != nil {
		response := errorResponse{
			errorResponseData{err.Error()},
		}

		serveAsJSON(w, response)
		return
	}

	response := queryResponse{
		queryResponseData{
			toQueryResponseColumns(columns),
			toStrings(result),
		},
	}

	serveAsJSON(w, response)
}

func toQueryResponseColumns(names []string) []queryResponseColumn {
	result := []queryResponseColumn{}
	for _, name := range names {
		result = append(result, queryResponseColumn{name})
	}

	return result
}

func toStrings(values [][]interface{}) [][]string {
	result := [][]string{}
	for _, vals := range values {
		rs := []string{}
		for _, val := range vals {
			_val, ok := val.(*interface{})
			if ok {
				rs = append(rs, fmt.Sprint(*_val))
			} else {
				rs = append(rs, "")
			}
		}

		result = append(result, rs)
	}

	return result
}

package database

import (
	"github.com/casperin/pg-amigo/internal/connection"
	"github.com/pkg/errors"
)

func GetDatabaseNames() ([]string, error) {
	var dbs []string
	if connection.PG == nil {
		return dbs, errors.New("No connection to database")
	}
	err := connection.PG.Select(&dbs, "SELECT datname FROM pg_database WHERE datistemplate = false;")
	return dbs, errors.Wrap(err, "Could not get databases")
}

package database

import (
	"github.com/casperin/pg-amigo/internal/connection"
	"github.com/pkg/errors"
)

func GetDatabaseNames(c connection.Selecter) ([]string, error) {
	var dbs []string
	err := c.Select(&dbs, "SELECT datname FROM pg_database WHERE datistemplate = false;")
	return dbs, errors.Wrap(err, "Could not get databases")
}

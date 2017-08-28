package database

import (
	"github.com/casperin/pg-amigo/internal/connection"
	"github.com/pkg/errors"
)

func CreateNewDatabase(dbName string) error {
	if connection.PG == nil {
		return errors.New("No connection to database")
	}
	_, err := connection.PG.Exec("CREATE DATABASE $1", dbName)
	return err
}

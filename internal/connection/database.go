package connection

import (
	"github.com/jmoiron/sqlx"
	"github.com/pkg/errors"
)

func GetDatabaseNames(c Selecter) ([]string, error) {
	var dbs []string
	err := c.Select(&dbs, "SELECT datname FROM pg_database WHERE datistemplate = false;")
	return dbs, errors.Wrap(err, "Could not get databases")
}

func CreateNewDatabase(c sqlx.Execer, dbName string) error {
	_, err := c.Exec("create database " + dbName)
	return errors.Wrapf(err, "Could not create db: %s", dbName)
}

func DeleteDatabase(c sqlx.Execer, dbName string) error {
	_, err := c.Exec("drop database " + dbName)
	return err
}

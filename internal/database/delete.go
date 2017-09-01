package database

import "github.com/jmoiron/sqlx"

func DeleteDatabase(c sqlx.Execer, dbName string) error {
	_, err := c.Exec(`drop database ` + dbName)
	return err
}

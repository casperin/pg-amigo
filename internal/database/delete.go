package database

import "github.com/casperin/pg-amigo/internal/connection"

func DeleteDatabase(dbName string) error {
	if err := connection.DropConnectionTo(dbName); err != nil {
		return err
	}
	return connection.PGExec(`drop database ` + dbName)
}

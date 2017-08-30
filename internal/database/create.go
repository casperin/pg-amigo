package database

import "github.com/casperin/pg-amigo/internal/connection"

func CreateNewDatabase(dbName string) error {
	return connection.PGExec(`create database ` + dbName)
}

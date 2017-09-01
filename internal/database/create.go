package database

import "github.com/jmoiron/sqlx"

func CreateNewDatabase(c sqlx.Execer, dbName string) error {
	_, err := c.Exec(`create database ` + dbName)
	return err
}

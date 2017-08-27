package database

import "github.com/casperin/pg-amigo/internal/connection"

func GetDatabaseNames() ([]string, error) {
	var dbs []string
	err := connection.PG.Select(&dbs, "SELECT datname FROM pg_database WHERE datistemplate = false;")
	return dbs, err
}

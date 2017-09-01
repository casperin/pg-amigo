package connection

import (
	"database/sql"
	"fmt"

	_ "github.com/casperin/pg-amigo/internal/configuration"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"github.com/pkg/errors"
	"github.com/spf13/viper"
)

var (
	pgUsername string = viper.GetString("pg_username")
	pgPassword string = viper.GetString("pg_password")
)

type Selecter interface {
	Select(dest interface{}, query string, args ...interface{}) error
}

type Conn struct {
	DBName string
}

func (c *Conn) connect() (*sqlx.DB, error) {
	cs := connectionString(c.DBName)
	return sqlx.Connect("postgres", cs)
}

func connectionString(dbName string) string {
	if dbName == "" {
		return fmt.Sprintf(
			"user=%s password=%s sslmode=disable",
			pgUsername,
			pgPassword,
		)
	}
	return fmt.Sprintf(
		"user=%s password=%s dbname=%s sslmode=disable",
		pgUsername,
		pgPassword,
		dbName,
	)
}

func Pg() *Conn {
	return &Conn{}
}

func New(dbName string) *Conn {
	return &Conn{dbName}
}

func (c *Conn) Exec(query string, args ...interface{}) (sql.Result, error) {
	db, err := c.connect()
	if err != nil {
		return nil, errors.Wrapf(err, "Could not connect to db %s\n", c.DBName)
	}
	defer db.Close()
	return db.Exec(query, args...)
}

func (c *Conn) Select(dest interface{}, query string, args ...interface{}) error {
	db, err := c.connect()
	if err != nil {
		return errors.Wrapf(err, "Could not connect to db %s\n", c.DBName)
	}
	defer db.Close()
	return db.Select(dest, query, args...)
}

package connection

import (
	"fmt"

	_ "github.com/casperin/pg-amigo/internal/configuration"
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"github.com/pkg/errors"
	"github.com/spf13/viper"
)

var (
	PG    *sqlx.DB // connected to PG, but no specific db
	Error error    = errors.New("Not yet connected.")
	Conns          = map[string]*sqlx.DB{}
)

func init() {
	Connect()
}

func Connect() {
	PG, Error = sqlx.Connect(
		"postgres",
		fmt.Sprintf(
			"user=%s password=%s sslmode=disable",
			viper.GetString("pg_username"),
			viper.GetString("pg_password"),
		),
	)
}

// This seems crazy. Don't know pg well enough >_<)
func connectTo(dbName string) error {
	db, err := sqlx.Connect(
		"postgres",
		fmt.Sprintf(
			"user=%s password=%s dbname=%s sslmode=disable",
			viper.GetString("pg_username"),
			viper.GetString("pg_password"),
			dbName,
		),
	)
	if err != nil {
		return err
	}
	Conns[dbName] = db
	return nil
}

func GetDB(dbName string) (*sqlx.DB, error) {
	if Conns[dbName] == nil {
		if err := connectTo(dbName); err != nil {
			return nil, err
		}
	}
	return Conns[dbName], nil
}

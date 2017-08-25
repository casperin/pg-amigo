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
	DB    *sqlx.DB
	Error error = errors.New("Not yet connected.")
)

func init() {
	Connect()
}

func Connect() {
	DB, Error = sqlx.Connect(
		"postgres",
		fmt.Sprintf(
			"user=%s password=%s sslmode=disable",
			viper.GetString("pg_username"),
			viper.GetString("pg_password"),
		),
	)
}

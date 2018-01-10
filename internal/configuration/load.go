package configuration

import "github.com/spf13/viper"

func init() {
	viper.SetDefault("port", "8000")
	viper.SetDefault("pg_host", "localhost")
	viper.SetDefault("pg_username", "postgres")
	viper.SetDefault("pg_password", "postgres")
	viper.SetDefault("app_secret", random())

	viper.AddConfigPath(".")
	viper.AutomaticEnv()

	viper.ReadInConfig() // if there is any
}

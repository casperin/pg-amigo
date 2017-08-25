package configuration

import "github.com/spf13/viper"

func init() {
	viper.SetDefault("port", "8000")
	viper.SetDefault("pg_username", "postgres")
	viper.SetDefault("pg_password", "postgres")

	viper.AddConfigPath(".")
	viper.AutomaticEnv()

	viper.ReadInConfig() // ignore error
}

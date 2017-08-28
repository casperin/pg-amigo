# PG Amigo

## Running

```sh
go run cmd/amigod/*.go
```

Overwrite defaults (I think) either with env variables

```sh
PORT=9000 go run cmd/amigod/*.go
```

or create a `config.json`:

```js
{
    "port": "8000",
    "pg_username": "postgres",
    "pg_password": "postgres"
}
```
See `internal/configuration/load.go` for what can be configured.

## Login system

You can add a `app_password` to the config to force a user to login in before
accessing all the databases.

If you want logins to persist across server restarts, then you have to provide
an `app_secret` as well.

```js
{
    "app_password": "abc123",
    "app_secret": "VeRy_SeCrEt_StRiNg!"
}
```

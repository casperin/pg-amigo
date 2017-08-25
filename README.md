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

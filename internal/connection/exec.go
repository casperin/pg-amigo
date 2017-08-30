package connection

import "github.com/pkg/errors"

func PGExec(query string, args ...interface{}) error {
	if PG == nil {
		return errors.New("No connection to database")
	}
	_, err := PG.Exec(query, args...)
	return err
}

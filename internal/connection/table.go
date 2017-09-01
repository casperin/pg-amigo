package connection

import (
	"database/sql"

	"github.com/pkg/errors"
)

type TableColumn struct {
	TableName     string         `db:"table_name"`
	ColumnName    string         `db:"column_name"`
	IsNullable    string         `db:"is_nullable"`
	ColumnDefault sql.NullString `db:"column_default"`
	UdtName       string         `db:"udt_name"`
}

func GetTablesOverview(c Selecter, dbName string) (map[string][]*TableColumn, error) {
	var columns []*TableColumn
	err := c.Select(
		&columns,
		// There is a *lot* more that can be asked for here
		`SELECT table_name, column_name, is_nullable, column_default, udt_name
		FROM information_schema.columns
		WHERE table_catalog = $1
		AND table_name != 'pg_proc'
		AND table_schema != 'pg_catalog'
		AND table_schema != 'information_schema'`,
		dbName,
	)
	if err != nil {
		return nil, errors.Wrap(err, "Could not get table information for db: "+dbName)
	}
	tables := map[string][]*TableColumn{}
	for _, c := range columns {
		if tables[c.TableName] == nil {
			tables[c.TableName] = []*TableColumn{}
		}
		tables[c.TableName] = append(tables[c.TableName], c)
	}
	return tables, nil
}

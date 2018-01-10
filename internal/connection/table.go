package connection

import (
	"github.com/pkg/errors"
)

type TableColumn struct {
	TableName              string     `db:"table_name" json:"tableName"`
	ColumnName             string     `db:"column_name" json:"columnName"`
	IsNullable             string     `db:"is_nullable" json:"isNullable"`
	ColumnDefault          nullString `db:"column_default" json:"columnDefault"`
	UdtName                string     `db:"udt_name" json:"udtName"`
	DataType               string     `db:"data_type" json:"dataType"`
	CharacterMaximumLength nullString `db:"character_maximum_length" json:"characterMaximumLength"`
	PrimaryKey             nullString `db:"constraint_type" json:"primaryKey"`
	ForeignKey             string     `json:"foreignKey"`
}

type Tables map[string][]*TableColumn

type ForeignKey struct {
	ConstraintName    string `db:"constraint_name"`
	TableName         string `db:"table_name"`
	ColumnName        string `db:"column_name"`
	ForeignTableName  string `db:"foreign_table_name"`
	ForeignColumnName string `db:"foreign_column_name"`
}

func GetTablesOverview(c Selecter, dbName string) (Tables, error) {
	var columns []*TableColumn
	err := c.Select(
		&columns,
		// There is a *lot* more that can be asked for here
		`SELECT 
		c.table_name, c.column_name, c.is_nullable, 
		c.column_default, c.udt_name, c.data_type, c.character_maximum_length, tc.constraint_type
		
		FROM information_schema.columns c

		LEFT JOIN information_schema.constraint_column_usage ccu ON ccu.column_name = c.column_name AND ccu.table_name = c.table_name 
		LEFT JOIN information_schema.table_constraints tc 
		ON tc.constraint_schema = ccu.constraint_schema AND ccu.constraint_name = tc.constraint_name

		WHERE c.table_catalog = $1
		AND c.table_name != 'pg_proc'
		AND c.table_schema != 'pg_catalog'
		AND c.table_schema != 'information_schema'
		AND (tc.constraint_type='PRIMARY KEY' or tc.constraint_type is NULL)`,
		dbName,
	)
	if err != nil {
		return nil, errors.Wrap(err, "Could not get table information for db: "+dbName)
	}

	var foreignKeys []*ForeignKey
	err = c.Select(
		&foreignKeys,
		`SELECT
				tc.constraint_name, tc.table_name, kcu.column_name, 
				ccu.table_name AS foreign_table_name,
				ccu.column_name AS foreign_column_name 
		FROM 
				information_schema.table_constraints AS tc 
				JOIN information_schema.key_column_usage AS kcu
					ON tc.constraint_name = kcu.constraint_name
				JOIN information_schema.constraint_column_usage AS ccu
					ON ccu.constraint_name = tc.constraint_name
		WHERE constraint_type = 'FOREIGN KEY'`,
	)

	foreignKeysMap := map[string]*ForeignKey{}
	for _, fk := range foreignKeys {
		foreignKeysMap[fk.TableName+"."+fk.ColumnName] = fk
	}

	tables := Tables{}
	for _, c := range columns {
		if tables[c.TableName] == nil {
			tables[c.TableName] = []*TableColumn{}
		}

		fk := foreignKeysMap[c.TableName+"."+c.ColumnName]
		if fk != nil {
			c.ForeignKey = "REFERENCES " + fk.ForeignTableName + "(" + fk.ForeignColumnName + ")"
		}
		tables[c.TableName] = append(tables[c.TableName], c)
	}

	return tables, nil
}

func QueryDB(db Queryer, cmd string) ([]string, [][]interface{}, error) {
	var columns []string
	result := [][]interface{}{}
	rows, err := db.Query(cmd)
	if err != nil {
		return columns, result, err
	}
	defer rows.Close()
	columns, err = rows.Columns()
	if err != nil {
		return columns, result, err
	}
	cols, err := rows.Columns()
	if err != nil {
		return columns, result, err
	}
	if cols == nil {
		return columns, result, nil
	}
	for rows.Next() {
		vals := make([]interface{}, len(cols))
		for i := 0; i < len(cols); i++ {
			vals[i] = new(interface{})
		}
		err = rows.Scan(vals...)
		if err != nil {
			return columns, result, err
		}
		result = append(result, vals)
	}
	if rows.Err() != nil {
		return columns, result, rows.Err()
	}
	return columns, result, nil
}

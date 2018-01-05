import { location as routerLocation } from "@hyperapp/router"

export const location = routerLocation.actions

export const loading = n => state => ({
  loading: Math.max(0, state.loading + n)
})

export const handleError = error => state => ({ error: error.message })

export const changePage = page => state => {
  return page === "query"
    ? { page, queryFilterString: "", queryFilterColumn: 0 }
    : { page }
}

export const updateDatabases = databases => state => {
  const tables = databases.reduce(
    (acc, db) => ({
      ...acc,
      [db]: { fetchingStatus: "NOT_ASKED" }
    }),
    {}
  )

  return databases.includes(state.selectedDatabase)
    ? { databases, tables }
    : { databases, tables, selectedDatabase: databases[0] }
}

export const selectDatabase = selectedDatabase => state => {
  localStorage.setItem("selectedDatabase", selectedDatabase)
  return { selectedDatabase }
}

export const updateQuery = query => state => ({ query })

export const onQueryFilterStringChange = queryFilterString => state => ({
  queryFilterString,
  queryCurrent: 1
})

export const onQueryFilterColumnChange = queryFilterColumn => state => ({
  queryFilterColumn,
  queryCurrent: 1
})

export const updateQueryStatus = queryStatus => state => ({ queryStatus })

export const updateQueryResult = queryResult => state => ({
  queryResult,
  queryCurrent: 1
})

export const addQueryToHistory = query => state => {
  const queryHistory = [
    query,
    ...state.queryHistory.filter(q => q !== query)
  ].slice(0, 20)
  localStorage.setItem("queryHistory", JSON.stringify(queryHistory))
  return { queryHistory }
}

export const updateQueryPage = queryCurrent => state => ({ queryCurrent })

export const updateChunkSize = queryChunkSize => state => ({
  queryChunkSize,
  queryCurrent: 1
})

export const updateTables = ({ db, tableDescription }) => state => ({
  tables: { ...state.tables, [db]: tableDescription }
})

export const toggleShowTable = ({ db, tableName }) => state => ({
  tables: {
    ...state.tables,
    [db]: {
      ...state.tables[db],
      tables: {
        ...state.tables[db].tables,
        [tableName]: {
          ...state.tables[db].tables[tableName],
          open: !state.tables[db].tables[tableName].open
        }
      }
    }
  }
})

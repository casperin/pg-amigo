export const loading = n => state => ({
  loading: Math.max(0, state.loading + n)
})

export const handleError = error => state => ({ error: error.message })

export const updateDatabases = databases => state => {
  return databases.includes(state.selectedDatabase)
    ? { databases }
    : { databases, selectedDatabase: databases[0] }
}

export const selectDatabase = selectedDatabase => state => {
  localStorage.setItem("selectedDatabase", selectedDatabase)
  return { selectedDatabase }
}

export const updateQuery = query => state => ({ query })

export const updateQueryResult = queryResult => state => ({ queryResult })

export const addQueryToHistory = query => state => {
  const queryHistory = [
    query,
    ...state.queryHistory.filter(q => q !== query)
  ].slice(0, 20)
  localStorage.setItem("queryHistory", JSON.stringify(queryHistory))
  return { queryHistory }
}

export const updateQueryPage = queryCurrent => state => ({ queryCurrent })

export const updateChunkSize = queryChunkSize => state => ({ queryChunkSize })

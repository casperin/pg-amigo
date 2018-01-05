const queryHistory = () => {
  const qh = localStorage.getItem("queryHistory")
  if (!qh) return []
  return JSON.parse(qh) || []
}

export default {
  location: location.state,
  page: "query",
  loading: 0,
  databases: [],
  selectedDatabase: localStorage.getItem("selectedDatabase") || null,
  query: "",
  queryFilterString: "",
  queryFilterColumn: 0,
  queryCurrent: 1,
  queryChunkSize: 50,
  queryHistory: queryHistory(),
  queryResult: null,
  queryStatus: "NOT_ASKED",
  tables: {},
  error: null
}

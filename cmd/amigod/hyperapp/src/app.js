import { h, app } from "hyperapp"
import * as actions from "./actions"
import * as api from "./api"
import Loading from "./views/loading"
import ErrorView from "./views/error"
import Query from "./pages/query"

const pages = {
  query: Query
}

const queryHistory = () => {
  const a = localStorage.getItem("queryHistory")
  if (!a) return []
  const b = JSON.parse(a)
  return b || []
}

app({
  state: {
    page: "query",
    loading: 0,
    databases: [],
    selectedDatabase: localStorage.getItem("selectedDatabase") || null,
    query: "",
    queryCurrent: 1,
    queryChunkSize: 50,
    queryHistory: queryHistory(),
    error: null
  },
  actions,
  view: state => actions => {
    const Page = pages[state.page]
    return (
      <main oncreate={() => fetchDatabases(actions)}>
        <ErrorView error={state.error} />
        <Loading count={state.loading} />
        <Page state={state} actions={actions} />
      </main>
    )
  }
})

const fetchDatabases = async actions => {
  actions.loading(1)
  try {
    const data = await api.getDatabaseServer()
    actions.updateDatabases(data.databases)
  } catch (e) {
    actions.handleError(e)
  }
  actions.loading(-1)
}

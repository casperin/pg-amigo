import { h, app } from "hyperapp"
import * as actions from "./actions"
import * as api from "./api"
import Loading from "./views/loading"
import ErrorView from "./views/error"
import Navigation from "./views/navigation"
import Query from "./pages/query"
import Tables from "./pages/tables"
import NotFound from "./pages/404"

const pages = {
  query: Query,
  tables: Tables
}

const queryHistory = () => {
  const qh = localStorage.getItem("queryHistory")
  if (!qh) return []
  return JSON.parse(qh) || []
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
    const Page = pages[state.page] || NotFound
    return (
      <main
        oncreate={() => {
          setupShortcuts(actions)
          fetchDatabases(actions)
        }}
      >
        <ErrorView error={state.error} />
        <Loading count={state.loading} />
        <Navigation state={state} actions={actions} />
        <div className="content">
          <Page state={state} actions={actions} />
        </div>
      </main>
    )
  }
})

const setupShortcuts = actions => {
  window.addEventListener("keyup", function(e) {
    if (!e.altKey) return
    switch (e.key) {
      case "q":
        return actions.changePage("query")
      case "t":
        return actions.changePage("tables")
    }
  })
}

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

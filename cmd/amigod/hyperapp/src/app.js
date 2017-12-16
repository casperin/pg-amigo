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

const state = {
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

app({
  state,
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
  window.addEventListener("keydown", e => {
    if (!e.altKey) return

    switch (e.keyCode) {
      case 81: // q
        e.preventDefault()
        return actions.changePage("query")
      case 84: // t
        e.preventDefault()
        return actions.changePage("tables")
    }
  })
}

const fetchDatabases = actions => {
  actions.loading(1)
  api
    .getDatabaseServer()
    .then(data => actions.updateDatabases(data.databases))
    .catch(actions.handleError)
    .then(_ => actions.loading(-1))
}

import { h, app } from "hyperapp"
import { Switch, Route, location, Redirect } from "@hyperapp/router"
import state from "./state"
import * as actions from "./actions"
import * as api from "./api"
import Loading from "./views/loading"
import ErrorView from "./views/error"
import Navigation from "./views/navigation"
import Query from "./pages/query"
import Tables from "./pages/tables"
import Export from "./pages/export"
import AlterTable from "./pages/alter-table"
import NotFound from "./pages/404"

const main = app(
  state,
  actions,
  (state, actions) => {
    return (
      <main
        oncreate={() => {
          setupShortcuts(actions)
          fetchDatabases(actions)
        }}
      >
        <ErrorView error={state.error} clearError={actions.clearError} />
        <Loading count={state.loading} />
        <Navigation state={state} actions={actions} />
        <div class="content">
          <Switch>
            <Route
              path="/query"
              render={() => {
                console.log('query:', state.selectedDatabase)
                return <Query state={state} actions={actions} />
              }}
            />

            <Route
              path="/tables"
              render={() => <Tables state={state} actions={actions} />}
            />

            <Route
              path="/tables/:table/alter"
              render={props => (
                <AlterTable
                  state={state}
                  actions={actions}
                  tableName={props.match.params.table}
                />
              )}
            />

            <Route
              path="/export"
              render={props => <Export db={state.selectedDatabase} />}
            />

            <Route
              path="/"
              render={() => {
                console.log(state.selectedDatabase)
                if (state.selectedDatabase) {
                  return <Redirect to="/query" />
                }
                return <p>Loading...</p>
              }}
            />
            <Route render={NotFound} />
          </Switch>
        </div>
      </main>
    )
  },
  document.body
)

location.subscribe(main.location)

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

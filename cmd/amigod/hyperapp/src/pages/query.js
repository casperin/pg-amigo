import { h } from "hyperapp"
import * as api from "../api"
import QueryResult from "../views/queryResult"

export default ({ state, actions }) => {
  return (
    <div>
      <div className="query-container">
        <div className="query-textarea-container">
          <textarea
            oncreate={el => el.focus()}
            value={state.query}
            oninput={e => actions.updateQuery(e.target.value)}
          />
        </div>

        <div className="query-controls">
          <button
            onclick={() =>
              runQuery(state.selectedDatabase, state.query, actions)
            }
            disabled={state.query.trim().length === 0}
          >
            Run
          </button>
          <select
            className="history-select"
            onchange={e => actions.updateQuery(e.target.value)}
          >
            <option value="">Previous queries</option>
            {state.queryHistory.map(query => (
              <option value={query}>{query}</option>
            ))}
          </select>
        </div>
      </div>

      <QueryResult state={state} actions={actions} />
    </div>
  )
}

const runQuery = (db, query, actions) => {
  actions.updateQueryStatus("LOADING")
  api
    .runQuery(db, query)
    .then(data => {
      actions.updateQueryResult(data)
      actions.updateQueryStatus(data.error ? "FAILURE" : "SUCCESS")
      actions.addQueryToHistory(query)
    })
    .catch(e => {
      actions.updateQueryStatus("FAILURE")
      actions.handleError(e)
    })
}

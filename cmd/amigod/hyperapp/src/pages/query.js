import { h } from "hyperapp"
import * as api from "../api"
import Textarea from "../views/textarea"
import QueryResult from "../views/queryResult"

export default ({ state, actions }) => {
  return (
    <div>
      <div class="query-container">
        <div class="query-textarea-container">
          <Textarea
            oncreate={el => el.focus()}
            value={state.query}
            oninput={e => actions.updateQuery(e.target.value)}
          />
        </div>

        <div class="query-controls">
          <button
            onclick={() =>
              runQuery(state.selectedDatabase, state.query, actions)
            }
            disabled={state.query.trim().length === 0}
          >
            Run
          </button>
          <select
            class="history-select"
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
  .runQuery(db, query.replace(/\n/g, " "))
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

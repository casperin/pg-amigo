import { h } from "hyperapp"
import * as api from "../api"
import Paginator from "../views/paginator"

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
            onclick={() => runQuery(state.selectedDatabase, state.query, actions)}
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

      {state.queryResult && (
        <div className="query-result-container">
          <Paginator
            onPageChange={actions.updateQueryPage}
            current={state.queryCurrent}
            total={Math.ceil(
              state.queryResult.values.length / state.queryChunkSize
            )}
            queryChunkSize={state.queryChunkSize}
            onChunkSizeChange={actions.updateChunkSize}
          />
          <table>
            <thead>
              <tr className="labels">
                {state.queryResult.schema.map(col => (
                  <td key={col.name}>{col.name}</td>
                ))}
              </tr>
            </thead>
            <tbody>
              {state.queryResult.values
                .slice(
                  (state.queryCurrent - 1) * state.queryChunkSize,
                  (state.queryCurrent - 1) * state.queryChunkSize +
                    state.queryChunkSize
                )
                .map((row, i) => (
                  <tr key={i}>{row.map((col, i) => <td key={i}>{col}</td>)}</tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const runQuery = async (db, query, actions) => {
  actions.loading(1)
  try {
    const data = await api.runQuery(db, query)
    actions.updateQueryResult(data)
    actions.addQueryToHistory(query)
  } catch (e) {
    actions.handleError(e)
  }
  actions.loading(-1)
}

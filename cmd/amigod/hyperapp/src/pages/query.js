import { h } from "hyperapp"
import * as api from "../api"

export default ({ state, actions }) => {
  return (
    <div>
      {state.databases.length > 0 && (
        <select onchange={e => actions.selectDatabase(e.target.value)}>
          {state.databases.map(db => (
            <option value={db} selected={db === state.selectedDatabase}>
              {db}
            </option>
          ))}
        </select>
      )}
      <textarea
        value={state.query}
        oninput={e => actions.updateQuery(e.target.value)}
      />
      <button
        onclick={() => runQuery(state.selectedDatabase, state.query, actions)}
      >
        Run
      </button>
      <select onchange={e => actions.updateQuery(e.target.value)}>
        <option value="">Previous queries</option>
        {state.queryHistory.map(query => (
          <option value={query}>{query}</option>
        ))}
      </select>
      <hr />
      {state.queryResult && (
        <table>
          <thead>
            <tr>
              {state.queryResult.schema.map(col => (
                <td key={col.name}>{col.name}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {state.queryResult.values.map((row, i) => (
              <tr key={i}>{row.map((col, i) => <td key={i}>{col}</td>)}</tr>
            ))}
          </tbody>
        </table>
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

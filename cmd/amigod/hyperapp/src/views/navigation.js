import { h } from "hyperapp"

export default ({state, actions}) => (
  <div className="navigation">
    <select
      className="database-selector"
      disabled={!state.databases.length}
      onchange={e => actions.selectDatabase(e.target.value)}
    >
      {state.databases.map(db => (
        <option value={db} selected={db === state.selectedDatabase}>
          {db}
        </option>
      ))}
    </select>

    <a
      href="/query"
      className={`${state.page === "query" ? "current" : ""}`}
      onclick={e => {
        e.preventDefault()
        actions.changePage("query")
      }}
    >
      Query
    </a>

    <a
      href="/tables"
      className={`${state.page === "tables" ? "current" : ""}`}
      onclick={e => {
        e.preventDefault()
        actions.changePage("tables")
      }}
    >
      Tables
    </a>
  </div>
)

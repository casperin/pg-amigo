import { h } from "hyperapp"
import { Link } from "@hyperapp/router"

export default ({ state, actions }) => (
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

    <Link to="/" className={getCurrent("/")}>
      Query
    </Link>

    <Link to="/tables" className={getCurrent("/tables")}>
      Tables
    </Link>
  </div>
)

const getCurrent = loc => {
  if (!window.location.pathname && loc === "/") return "current"
  return window.location.pathname === loc ? "current" : ""
}

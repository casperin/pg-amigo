import { h } from "hyperapp"
import Paginator from "./paginator"

export default props => {
  switch (props.state.queryStatus) {
    case "NOT_ASKED":
      return null

    case "LOADING":
      return <p>Loading...</p>

    case "SUCCESS":
      return <QuerySuccess {...props} />

    case "FAILURE":
      return <pre class="display-error">{props.state.queryResult.error}</pre>

    default:
      return null
  }
}

const QuerySuccess = ({ state, actions }) => {
  const values = state.queryFilterString.trim()
    ? state.queryResult.values.filter(row =>
        filterRow(row, state.queryFilterString, state.queryFilterColumn)
      )
    : state.queryResult.values

  return (
    <div class="query-result-container">
      <Paginator
        onPageChange={actions.updateQueryPage}
        current={state.queryCurrent}
        total={Math.ceil(values.length / state.queryChunkSize)}
        queryChunkSize={state.queryChunkSize}
        onChunkSizeChange={actions.updateChunkSize}
        queryTruncate={state.queryTruncate}
        onTruncateChange={actions.onTruncateChange}
        queryFilterString={state.queryFilterString}
        queryFilterColumn={state.queryFilterColumn}
        columnNames={state.queryResult.schema.map(col => col.name)}
        onQueryFilterStringChange={actions.onQueryFilterStringChange}
        onQueryFilterColumnChange={actions.onQueryFilterColumnChange}
      />
      <table class="query-table">
        <thead>
          <tr class="labels">
            {state.queryResult.schema.map(col => (
              <td key={col.name}>{col.name}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {values
            .slice(
              (state.queryCurrent - 1) * state.queryChunkSize,
              (state.queryCurrent - 1) * state.queryChunkSize +
                state.queryChunkSize
            )
            .map((row, i) => (
              <tr key={i}>
                {row.map((col, i) => (
                  <td key={i}>{truncate(col, state.queryTruncate)}</td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

const filterRow = (row, strs, colIdx) =>
  strs
    .toLowerCase()
    .split(" ")
    .every(str => row[colIdx] && row[colIdx].toLowerCase().includes(str))

const truncate = (str, len) => {
  if (len === -1 || str.length < len - 3) return str
  return str.substr(0, len) + "…"
}

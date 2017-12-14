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
      return <pre className="display-error">{props.state.queryResult.error}</pre>

    default:
      return null
  }
}

const QuerySuccess = ({ state, actions }) => (
  <div className="query-result-container">
    <Paginator
      onPageChange={actions.updateQueryPage}
      current={state.queryCurrent}
      total={Math.ceil(state.queryResult.values.length / state.queryChunkSize)}
      queryChunkSize={state.queryChunkSize}
      onChunkSizeChange={actions.updateChunkSize}
    />
    <table className='query-table'>
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
)

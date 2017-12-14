import { h } from "hyperapp"

export default props => (
  <div className="paginator">
    <button
      className="paginator__button"
      onclick={e => props.onPageChange(props.current - 1)}
      disabled={props.current === 1}
    >
      Prev
    </button>

    <div className="paginator__numbers">
      {props.current} / {props.total}
    </div>

    <button
      className="paginator__button"
      onclick={e => props.onPageChange(props.current + 1)}
      disabled={props.current === props.total}
    >
      Next
    </button>

    <div className="paginator__chunks">
      <span>Rows / page</span>
      <select onchange={e => props.onChunkSizeChange(Number(e.target.value))}>
        <option value="10" selected={props.queryChunkSize === 10}>
          10
        </option>
        <option value="50" selected={props.queryChunkSize === 50}>
          50
        </option>
        <option value="250" selected={props.queryChunkSize === 250}>
          250
        </option>
        <option value="1000" selected={props.queryChunkSize === 1000}>
          1000
        </option>
      </select>
    </div>
  </div>
)

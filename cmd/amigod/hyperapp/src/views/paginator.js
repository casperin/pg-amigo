import { h } from "hyperapp"

export default props => (
  <div class="paginator">
    <button
      class="paginator__button"
      onclick={e => props.onPageChange(props.current - 1)}
      disabled={props.current === 1}
    >
      Prev
    </button>

    <div class="paginator__numbers">
      {props.current} / {props.total}
    </div>

    <button
      class="paginator__button"
      onclick={e => props.onPageChange(props.current + 1)}
      disabled={props.current === props.total}
    >
      Next
    </button>

    <div class="paginator__chunks">
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

    <div class="paginator__filter">
      <select
        onchange={e => props.onQueryFilterColumnChange(Number(e.target.value))}
      >
        {props.columnNames.map((name, i) => (
          <option value={i} selected={props.queryFilterColumn === i}>
            {name}
          </option>
        ))}
      </select>

      <input
        value={props.queryFilterString}
        oninput={e => props.onQueryFilterStringChange(e.target.value)}
        placeholder="Search"
        type="search"
      />
    </div>
  </div>
)

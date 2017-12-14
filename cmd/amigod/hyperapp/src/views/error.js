import { h } from "hyperapp"

export default props =>
  props.error ? <div className="error">{props.error}</div> : null

import { h } from "hyperapp"

export default props =>
  props.error ? <div class="error">{props.error}</div> : null

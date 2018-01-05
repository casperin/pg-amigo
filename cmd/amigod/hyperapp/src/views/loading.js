import { h } from "hyperapp"

export default props =>
  props.count < 1 ? null : <div class="loading-indicator">Loading</div>

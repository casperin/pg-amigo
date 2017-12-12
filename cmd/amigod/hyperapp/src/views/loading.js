import { h } from "hyperapp"

export default props =>
  props.count < 1 ? null : <div className="loading-indicator">Loading</div>

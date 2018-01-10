import { h } from "hyperapp"

export default props => {
  if (!props.error) return null
  return (
    <div class="error">
      <div class="error-message">{props.error}</div>
      <div class="error-controls">
        <button onclick={props.clearError}>Hide</button>
      </div>
    </div>
  )
}

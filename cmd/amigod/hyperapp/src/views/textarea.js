import { h } from "hyperapp"

export default (() => {
  let baseScrollHeight
  return p => {
    const { rows = 3, oncreate, oninput, ...props } = p
    return (
      <textarea
        {...props}
        rows={rows}
        oncreate={function (textarea) {
          const val = textarea.value
          textarea.value = ''
          baseScrollHeight = textarea.scrollHeight
          textarea.value = val
          if (oncreate) oncreate(textarea)
        }}
        oninput={e => {
          e.target.rows = rows
          const addedRows = Math.ceil((e.target.scrollHeight - baseScrollHeight) / 18)
          e.target.rows = rows + addedRows
          if (oninput) oninput(e)
        }}
      />
    )
  }
})()

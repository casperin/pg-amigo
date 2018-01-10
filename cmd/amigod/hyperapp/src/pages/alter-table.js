import { h } from "hyperapp"
import { location } from "@hyperapp/router"
import * as api from "../api"

export default ({ state, actions, tableName }) => (
  <div>
    <h1>Alter {tableName}</h1>
    <dl>
      <dt>Rename table</dt>
      <dd>
        <input
          value={state.renameTable}
          oninput={e => actions.renameTable(e.target.value)}
          autofocus
          placeholder={tableName}
        />{" "}
        <button
          disabled={!state.renameTable}
          onclick={() =>
            renameTable(
              state.selectedDatabase,
              tableName,
              state.renameTable,
              actions
            )
          }
        >
          Rename
        </button>
      </dd>
    </dl>
  </div>
)

const renameTable = (db, oldName, newName, actions) => {
  const query = `ALTER TABLE ${oldName} RENAME TO ${newName};`
  actions.loading(1)
  api
    .runQuery(db, query)
    .then(api.throwIfErrorInData)
    .then(api.getDatabaseServer)
    .then(data => actions.updateDatabases(data.databases))
    .then(_ => location.actions.go("/tables"))
    .catch(actions.handleError)
    .then(_ => actions.loading(-1))
}

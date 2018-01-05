import { h } from "hyperapp"
import * as api from "../api"

export default ({ state, actions }) => {
  const tableDescription = state.tables[state.selectedDatabase] || {
    fetchingStatus: "NOT_ASKED" }

  if (tableDescription.fetchingStatus === "NOT_ASKED") {
    fetchTables(state.selectedDatabase, actions)
  }

  return (
    <div>
      <h1>{state.selectedDatabase} tables</h1>
      <Tables
        db={state.selectedDatabase}
        tableDescription={tableDescription}
        actions={actions}
      />
    </div>
  )
}

const Tables = ({ db, tableDescription, actions }) => {
  switch (tableDescription.fetchingStatus) {
    case "NOT_ASKED":
      return null

    case "LOADING":
      return <p>Loading...</p>

    case "SUCCESS":
      return (
        <div>
          {Object.entries(tableDescription.tables).map(([tableName, desc]) => (
            <div>
              <h2>
                {tableName} ({desc.columns.length} columns)
                <button
                  onclick={e => actions.toggleShowTable({ db, tableName })}
                >
                  {desc.open ? "Close" : "Open"}
                </button>
              </h2>
              {desc.open && (
                <table>
                  <thead>
                    <tr class="labels">
                      <td>Name</td>
                      <td>isNullable</td>
                      <td>UDT Name</td>
                    </tr>
                  </thead>
                  <tbody>
                    {desc.columns.map(row => (
                      <tr>
                        <td>{row.columnName}</td>
                        <td>{row.isNullable}</td>
                        <td>{row.udtName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
        </div>
      )

    case "FAILURE":
      return <pre class="display-error">{tableDescription.error}</pre>
  }
}

const fetchTables = async (db, actions) => {
  actions.updateTables({ db, tableDescription: { fetchingStatus: "LOADING" } })
  actions.loading(1)
  try {
    const data = await api.getTables(db)
    const tables = Object.entries(data).reduce(
      (acc, [tableName, columns]) => ({
        ...acc,
        [tableName]: {
          open: false,
          columns
        }
      }),
      {}
    )
    actions.updateTables({
      db,
      tableDescription: {
        fetchingStatus: "SUCCESS",
        tables
      }
    })
  } catch (e) {
    actions.handleError(e)
  }
  actions.loading(-1)
}

import { h } from "hyperapp"

export default ({ db }) => (
  <div>
    <h1>Export {db}</h1>
    <p>
      Depending on the size of your database, the export can be quite large.
    </p>
    <p>
      <code>pg_dump</code> is used, with standard flags.
    </p>
    <h2>
      <a href={`/api/dump/${db}`} target="BLANK_">
        Dump database
      </a>{" "}
      <small>(Opens in a new window)</small>
    </h2>
  </div>
)

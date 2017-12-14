const fetchOptions = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Cache: "no-cache"
  },
  credentials: "include"
}

const get = (url, opt) =>
  fetch(url, { ...fetchOptions, ...opt })
    .then(res => res.json())
    .then(resp => resp.data)

export const getDatabaseServer = () => get("/api/database-server")

export const runQuery = (db, query) => get("/api/query/" + db + "?q=" + query)

export const getTables = db => get("/api/tables/" + db)

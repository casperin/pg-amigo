(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n(e.hyperapp={})}(this,function(e){"use strict";function n(e,n){function t(e,n){return e&&r(e.tagName.toLowerCase(),{},n.call(e.childNodes,function(e){return 3===e.nodeType?e.nodeValue:t(e,n)}))}function o(e,n){for(var r in n)e[r]=n[r];return e}function i(e,n){return o(o({},e),n)}function u(e,n,r){var t={};return 0===e.length?n:(t[e[0]]=1<e.length?u(e.slice(1),n,r[e[0]]):n,i(r,t))}function f(e,n){for(var r=0;r<e.length;r++)n=n[e[r]];return n}function p(e){return"function"==typeof e}function l(e,n,r,t){for(var o in r)p(r[o])?function(r,o){n[r]=function(r){return e=f(t,k),p(r=o(r))&&p(r=r(e))&&(r=r(n)),r&&r!==e&&!r.then&&g(k=u(t,i(e,r),k)),r}}(o,r[o]):l(e[o]||(e[o]={}),n[o]={},r[o],t.concat(o))}function c(e){if(e&&e.props)return e.props.key}function s(e,n,r,t){if("key"===n);else if("style"===n)for(var o in i(t,r=r||{}))e.style[o]=null==r[o]?"":r[o];else{try{e[n]=null==r?"":r}catch(e){}p(r)||(null==r||!1===r?e.removeAttribute(n):e.setAttribute(n,r))}}function a(e,n){if("string"==typeof e)var r=document.createTextNode(e);else{var r=(n=n||"svg"===e.type)?document.createElementNS("http://www.w3.org/2000/svg",e.type):document.createElement(e.type);e.props.oncreate&&N.push(function(){e.props.oncreate(r)});for(var t=0;t<e.children.length;t++)r.appendChild(a(e.children[t],n));for(var t in e.props)s(r,t,e.props[t])}return r}function d(e,n,r){for(var t in i(n,r)){var o=r[t],u="value"===t||"checked"===t?e[t]:n[t];o!==u&&s(e,t,o,u)}r.onupdate&&N.push(function(){r.onupdate(e,n)})}function h(e,n,r){function t(){e.removeChild(n)}r&&r.onremove?r.onremove(n,t):t()}function v(e,n,r,t,o,i){if(r===t);else if(null==r)n=e.insertBefore(a(t,o),n);else if(null!=t.type&&t.type===r.type){d(n,r.props,t.props),o=o||"svg"===t.type;for(var u=t.children.length,f=r.children.length,p={},l=[],s={},y=0;y<f;y++){var g=l[y]=n.childNodes[y],m=r.children[y],w=c(m);null!=w&&(p[w]=[g,m])}for(var y=0,b=0;b<u;){var g=l[y],m=r.children[y],N=t.children[b],w=c(m);if(s[w])y++;else{var k=c(N),x=p[k]||[];null==k?(null==w&&(v(n,g,m,N,o),b++),y++):(w===k?(v(n,x[0],x[1],N,o),y++):x[0]?(n.insertBefore(x[0],g),v(n,x[0],x[1],N,o)):v(n,g,null,N,o),b++,s[k]=N)}}for(;y<f;){var m=r.children[y],w=c(m);null==w&&h(n,l[y],m.props),y++}for(var y in p){var x=p[y],A=x[1];s[A.props.key]||h(n,x[0],A.props)}}else n&&t!==n.nodeValue&&("string"==typeof t&&"string"==typeof r?n.nodeValue=t:(n=e.insertBefore(a(t,o),i=n),h(e,i,r.props)));return n}function y(r){for(m=!m,p(r=e.view(k))&&(r=r(x)),m||(w=v(n,w,b,b=r));r=N.pop();)r()}function g(){e.view&&!m&&setTimeout(y,m=!m)}var m,w=(n=n||document.body).children[0],b=t(w,[].map),N=[],k=e.state||{},x={};return g(l(k,x,e.actions,[])),x}function r(e,n){for(var r,t=[],o=[],i=arguments.length;i-- >2;)t.push(arguments[i]);for(;t.length;)if(Array.isArray(r=t.pop()))for(i=r.length;i--;)t.push(r[i]);else null==r||!0===r||!1===r||o.push("number"==typeof r?r+="":r);return"string"==typeof e?{type:e,props:n||{},children:o}:e(n||{},o)}e.app=n,e.h=r});

},{}],2:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.actions = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  const loading = exports.loading = n => state => ({
    loading: Math.max(0, state.loading + n)
  });

  const handleError = exports.handleError = error => state => ({ error: error.message });

  const changePage = exports.changePage = page => state => {
    return page === "query" ? { page, queryFilterString: "", queryFilterColumn: 0 } : { page };
  };

  const updateDatabases = exports.updateDatabases = databases => state => {
    const tables = databases.reduce((acc, db) => _extends({}, acc, {
      [db]: { fetchingStatus: "NOT_ASKED" }
    }), {});

    return databases.includes(state.selectedDatabase) ? { databases, tables } : { databases, tables, selectedDatabase: databases[0] };
  };

  const selectDatabase = exports.selectDatabase = selectedDatabase => state => {
    localStorage.setItem("selectedDatabase", selectedDatabase);
    return { selectedDatabase };
  };

  const updateQuery = exports.updateQuery = query => state => ({ query });

  const onQueryFilterStringChange = exports.onQueryFilterStringChange = queryFilterString => state => ({
    queryFilterString,
    queryCurrent: 1
  });

  const onQueryFilterColumnChange = exports.onQueryFilterColumnChange = queryFilterColumn => state => ({
    queryFilterColumn,
    queryCurrent: 1
  });

  const updateQueryStatus = exports.updateQueryStatus = queryStatus => state => ({ queryStatus });

  const updateQueryResult = exports.updateQueryResult = queryResult => state => ({ queryResult });

  const addQueryToHistory = exports.addQueryToHistory = query => state => {
    const queryHistory = [query, ...state.queryHistory.filter(q => q !== query)].slice(0, 20);
    localStorage.setItem("queryHistory", JSON.stringify(queryHistory));
    return { queryHistory };
  };

  const updateQueryPage = exports.updateQueryPage = queryCurrent => state => ({ queryCurrent });

  const updateChunkSize = exports.updateChunkSize = queryChunkSize => state => ({
    queryChunkSize,
    queryCurrent: 1
  });

  const updateTables = exports.updateTables = ({ db, tableDescription }) => state => ({
    tables: _extends({}, state.tables, { [db]: tableDescription })
  });

  const toggleShowTable = exports.toggleShowTable = ({ db, tableName }) => state => ({
    tables: _extends({}, state.tables, {
      [db]: _extends({}, state.tables[db], {
        tables: _extends({}, state.tables[db].tables, {
          [tableName]: _extends({}, state.tables[db].tables[tableName], {
            open: !state.tables[db].tables[tableName].open
          })
        })
      })
    })
  });
});

},{}],3:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.api = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  const fetchOptions = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Cache: "no-cache"
    },
    credentials: "include"
  };

  const get = (url, opt) => fetch(url, _extends({}, fetchOptions, opt)).then(res => res.json()).then(resp => resp.data);

  const getDatabaseServer = exports.getDatabaseServer = () => get("/api/database-server");

  const runQuery = exports.runQuery = (db, query) => get("/api/query/" + db + "?q=" + query);

  const getTables = exports.getTables = db => get("/api/tables/" + db);
});

},{}],4:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["hyperapp", "./actions", "./api", "./views/loading", "./views/error", "./views/navigation", "./pages/query", "./pages/tables", "./pages/404"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("hyperapp"), require("./actions"), require("./api"), require("./views/loading"), require("./views/error"), require("./views/navigation"), require("./pages/query"), require("./pages/tables"), require("./pages/404"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.hyperapp, global.actions, global.api, global.loading, global.error, global.navigation, global.query, global.tables, global._);
    global.app = mod.exports;
  }
})(this, function (_hyperapp, _actions, _api, _loading, _error, _navigation, _query, _tables, _2) {
  "use strict";

  var actions = _interopRequireWildcard(_actions);

  var api = _interopRequireWildcard(_api);

  var _loading2 = _interopRequireDefault(_loading);

  var _error2 = _interopRequireDefault(_error);

  var _navigation2 = _interopRequireDefault(_navigation);

  var _query2 = _interopRequireDefault(_query);

  var _tables2 = _interopRequireDefault(_tables);

  var _3 = _interopRequireDefault(_2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  const pages = {
    query: _query2.default,
    tables: _tables2.default
  };

  const queryHistory = () => {
    const qh = localStorage.getItem("queryHistory");
    if (!qh) return [];
    return JSON.parse(qh) || [];
  };

  const state = {
    page: "query",
    loading: 0,
    databases: [],
    selectedDatabase: localStorage.getItem("selectedDatabase") || null,
    query: "",
    queryFilterString: "",
    queryFilterColumn: 0,
    queryCurrent: 1,
    queryChunkSize: 50,
    queryHistory: queryHistory(),
    queryResult: null,
    queryStatus: "NOT_ASKED",
    tables: {},
    error: null
  };

  (0, _hyperapp.app)({
    state,
    actions,
    view: state => actions => {
      const Page = pages[state.page] || _3.default;
      return (0, _hyperapp.h)(
        "main",
        {
          oncreate: () => {
            setupShortcuts(actions);
            fetchDatabases(actions);
          }
        },
        (0, _hyperapp.h)(_error2.default, { error: state.error }),
        (0, _hyperapp.h)(_loading2.default, { count: state.loading }),
        (0, _hyperapp.h)(_navigation2.default, { state: state, actions: actions }),
        (0, _hyperapp.h)(
          "div",
          { className: "content" },
          (0, _hyperapp.h)(Page, { state: state, actions: actions })
        )
      );
    }
  });

  const setupShortcuts = actions => {
    window.addEventListener("keydown", e => {
      if (!e.altKey) return;

      switch (e.keyCode) {
        case 81:
          // q
          e.preventDefault();
          return actions.changePage("query");
        case 84:
          // t
          e.preventDefault();
          return actions.changePage("tables");
      }
    });
  };

  const fetchDatabases = actions => {
    actions.loading(1);
    api.getDatabaseServer().then(data => actions.updateDatabases(data.databases)).catch(actions.handleError).then(_ => actions.loading(-1));
  };
});

},{"./actions":2,"./api":3,"./pages/404":5,"./pages/query":6,"./pages/tables":7,"./views/error":8,"./views/loading":9,"./views/navigation":10,"hyperapp":1}],5:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "hyperapp"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("hyperapp"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.hyperapp);
    global._ = mod.exports;
  }
})(this, function (exports, _hyperapp) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = props => (0, _hyperapp.h)(
    "h1",
    null,
    "404: ",
    props.page
  );
});

},{"hyperapp":1}],6:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "hyperapp", "../api", "../views/queryResult"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("hyperapp"), require("../api"), require("../views/queryResult"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.hyperapp, global.api, global.queryResult);
    global.query = mod.exports;
  }
})(this, function (exports, _hyperapp, _api, _queryResult) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var api = _interopRequireWildcard(_api);

  var _queryResult2 = _interopRequireDefault(_queryResult);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  exports.default = ({ state, actions }) => {
    return (0, _hyperapp.h)(
      "div",
      null,
      (0, _hyperapp.h)(
        "div",
        { className: "query-container" },
        (0, _hyperapp.h)(
          "div",
          { className: "query-textarea-container" },
          (0, _hyperapp.h)("textarea", {
            oncreate: el => el.focus(),
            value: state.query,
            oninput: e => actions.updateQuery(e.target.value)
          })
        ),
        (0, _hyperapp.h)(
          "div",
          { className: "query-controls" },
          (0, _hyperapp.h)(
            "button",
            {
              onclick: () => runQuery(state.selectedDatabase, state.query, actions),
              disabled: state.query.trim().length === 0
            },
            "Run"
          ),
          (0, _hyperapp.h)(
            "select",
            {
              className: "history-select",
              onchange: e => actions.updateQuery(e.target.value)
            },
            (0, _hyperapp.h)(
              "option",
              { value: "" },
              "Previous queries"
            ),
            state.queryHistory.map(query => (0, _hyperapp.h)(
              "option",
              { value: query },
              query
            ))
          )
        )
      ),
      (0, _hyperapp.h)(_queryResult2.default, { state: state, actions: actions })
    );
  };

  const runQuery = (db, query, actions) => {
    actions.updateQueryStatus("LOADING");
    api.runQuery(db, query).then(data => {
      actions.updateQueryResult(data);
      actions.updateQueryStatus(data.error ? "FAILURE" : "SUCCESS");
      actions.addQueryToHistory(query);
    }).catch(e => {
      actions.updateQueryStatus("FAILURE");
      actions.handleError(e);
    });
  };
});

},{"../api":3,"../views/queryResult":12,"hyperapp":1}],7:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "hyperapp", "../api"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("hyperapp"), require("../api"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.hyperapp, global.api);
    global.tables = mod.exports;
  }
})(this, function (exports, _hyperapp, _api) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var api = _interopRequireWildcard(_api);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  exports.default = ({ state, actions }) => {
    const tableDescription = state.tables[state.selectedDatabase];

    if (tableDescription.fetchingStatus === "NOT_ASKED") {
      fetchTables(state.selectedDatabase, actions);
    }

    return (0, _hyperapp.h)(
      "div",
      null,
      (0, _hyperapp.h)(
        "h1",
        null,
        "Tableoeuoteuh: ",
        state.selectedDatabase
      ),
      (0, _hyperapp.h)(Tables, {
        db: state.selectedDatabase,
        tableDescription: tableDescription,
        actions: actions
      })
    );
  };

  const Tables = ({ db, tableDescription, actions }) => {
    switch (tableDescription.fetchingStatus) {
      case "NOT_ASKED":
        return null;

      case "LOADING":
        return (0, _hyperapp.h)(
          "p",
          null,
          "Loading..."
        );

      case "SUCCESS":
        return (0, _hyperapp.h)(
          "div",
          null,
          Object.entries(tableDescription.tables).map(([tableName, desc]) => (0, _hyperapp.h)(
            "div",
            null,
            (0, _hyperapp.h)(
              "h4",
              null,
              tableName,
              " (",
              desc.columns.length,
              " columns)",
              (0, _hyperapp.h)(
                "button",
                {
                  onclick: e => actions.toggleShowTable({ db, tableName })
                },
                desc.open ? "Close" : "Open"
              )
            ),
            desc.open && (0, _hyperapp.h)(
              "table",
              null,
              (0, _hyperapp.h)(
                "thead",
                null,
                (0, _hyperapp.h)(
                  "tr",
                  null,
                  (0, _hyperapp.h)(
                    "td",
                    null,
                    "Name"
                  ),
                  (0, _hyperapp.h)(
                    "td",
                    null,
                    "isNullable"
                  ),
                  (0, _hyperapp.h)(
                    "td",
                    null,
                    "UDT Name"
                  )
                )
              ),
              (0, _hyperapp.h)(
                "tbody",
                null,
                desc.columns.map(row => (0, _hyperapp.h)(
                  "tr",
                  null,
                  (0, _hyperapp.h)(
                    "td",
                    null,
                    row.columnName
                  ),
                  (0, _hyperapp.h)(
                    "td",
                    null,
                    row.isNullable
                  ),
                  (0, _hyperapp.h)(
                    "td",
                    null,
                    row.udtName
                  )
                ))
              )
            )
          ))
        );

      case "FAILURE":
        return (0, _hyperapp.h)(
          "pre",
          { className: "display-error" },
          tableDescription.error
        );
    }
  };

  const fetchTables = async (db, actions) => {
    actions.updateTables({ db, tableDescription: { fetchingStatus: "LOADING" } });
    actions.loading(1);
    try {
      const data = await api.getTables(db);
      const tables = Object.entries(data).reduce((acc, [tableName, columns]) => _extends({}, acc, {
        [tableName]: {
          open: false,
          columns
        }
      }), {});
      actions.updateTables({
        db,
        tableDescription: {
          fetchingStatus: "SUCCESS",
          tables
        }
      });
    } catch (e) {
      actions.handleError(e);
    }
    actions.loading(-1);
  };
});

},{"../api":3,"hyperapp":1}],8:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "hyperapp"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("hyperapp"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.hyperapp);
    global.error = mod.exports;
  }
})(this, function (exports, _hyperapp) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = props => props.error ? (0, _hyperapp.h)(
    "div",
    { className: "error" },
    props.error
  ) : null;
});

},{"hyperapp":1}],9:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "hyperapp"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("hyperapp"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.hyperapp);
    global.loading = mod.exports;
  }
})(this, function (exports, _hyperapp) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = props => props.count < 1 ? null : (0, _hyperapp.h)(
    "div",
    { className: "loading-indicator" },
    "Loading"
  );
});

},{"hyperapp":1}],10:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "hyperapp"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("hyperapp"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.hyperapp);
    global.navigation = mod.exports;
  }
})(this, function (exports, _hyperapp) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = ({ state, actions }) => (0, _hyperapp.h)(
    "div",
    { className: "navigation" },
    (0, _hyperapp.h)(
      "select",
      {
        className: "database-selector",
        disabled: !state.databases.length,
        onchange: e => actions.selectDatabase(e.target.value)
      },
      state.databases.map(db => (0, _hyperapp.h)(
        "option",
        { value: db, selected: db === state.selectedDatabase },
        db
      ))
    ),
    (0, _hyperapp.h)(
      "a",
      {
        href: "/query",
        className: `${state.page === "query" ? "current" : ""}`,
        onclick: e => {
          e.preventDefault();
          actions.changePage("query");
        }
      },
      "Query"
    ),
    (0, _hyperapp.h)(
      "a",
      {
        href: "/tables",
        className: `${state.page === "tables" ? "current" : ""}`,
        onclick: e => {
          e.preventDefault();
          actions.changePage("tables");
        }
      },
      "Tables"
    )
  );
});

},{"hyperapp":1}],11:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "hyperapp"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("hyperapp"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.hyperapp);
    global.paginator = mod.exports;
  }
})(this, function (exports, _hyperapp) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = props => (0, _hyperapp.h)(
    "div",
    { className: "paginator" },
    (0, _hyperapp.h)(
      "button",
      {
        className: "paginator__button",
        onclick: e => props.onPageChange(props.current - 1),
        disabled: props.current === 1
      },
      "Prev"
    ),
    (0, _hyperapp.h)(
      "div",
      { className: "paginator__numbers" },
      props.current,
      " / ",
      props.total
    ),
    (0, _hyperapp.h)(
      "button",
      {
        className: "paginator__button",
        onclick: e => props.onPageChange(props.current + 1),
        disabled: props.current === props.total
      },
      "Next"
    ),
    (0, _hyperapp.h)(
      "div",
      { className: "paginator__chunks" },
      (0, _hyperapp.h)(
        "span",
        null,
        "Rows / page"
      ),
      (0, _hyperapp.h)(
        "select",
        { onchange: e => props.onChunkSizeChange(Number(e.target.value)) },
        (0, _hyperapp.h)(
          "option",
          { value: "10", selected: props.queryChunkSize === 10 },
          "10"
        ),
        (0, _hyperapp.h)(
          "option",
          { value: "50", selected: props.queryChunkSize === 50 },
          "50"
        ),
        (0, _hyperapp.h)(
          "option",
          { value: "250", selected: props.queryChunkSize === 250 },
          "250"
        ),
        (0, _hyperapp.h)(
          "option",
          { value: "1000", selected: props.queryChunkSize === 1000 },
          "1000"
        )
      )
    ),
    (0, _hyperapp.h)(
      "div",
      { className: "paginator__filter" },
      (0, _hyperapp.h)(
        "select",
        {
          onchange: e => props.onQueryFilterColumnChange(Number(e.target.value))
        },
        props.columnNames.map((name, i) => (0, _hyperapp.h)(
          "option",
          { value: i, selected: props.queryFilterColumn === i },
          name
        ))
      ),
      (0, _hyperapp.h)("input", {
        value: props.queryFilterString,
        oninput: e => props.onQueryFilterStringChange(e.target.value),
        placeholder: "Search",
        type: "search"
      })
    )
  );
});

},{"hyperapp":1}],12:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "hyperapp", "./paginator"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("hyperapp"), require("./paginator"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.hyperapp, global.paginator);
    global.queryResult = mod.exports;
  }
})(this, function (exports, _hyperapp, _paginator) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _paginator2 = _interopRequireDefault(_paginator);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = props => {
    switch (props.state.queryStatus) {
      case "NOT_ASKED":
        return null;

      case "LOADING":
        return (0, _hyperapp.h)(
          "p",
          null,
          "Loading..."
        );

      case "SUCCESS":
        return (0, _hyperapp.h)(QuerySuccess, props);

      case "FAILURE":
        return (0, _hyperapp.h)(
          "pre",
          { className: "display-error" },
          props.state.queryResult.error
        );

      default:
        return null;
    }
  };

  const QuerySuccess = ({ state, actions }) => {
    const values = state.queryFilterString.trim() ? state.queryResult.values.filter(row => filterRow(row, state.queryFilterString, state.queryFilterColumn)) : state.queryResult.values;

    return (0, _hyperapp.h)(
      "div",
      { className: "query-result-container" },
      (0, _hyperapp.h)(_paginator2.default, {
        onPageChange: actions.updateQueryPage,
        current: state.queryCurrent,
        total: Math.ceil(values.length / state.queryChunkSize),
        queryChunkSize: state.queryChunkSize,
        onChunkSizeChange: actions.updateChunkSize,
        queryFilterString: state.queryFilterString,
        queryFilterColumn: state.queryFilterColumn,
        columnNames: state.queryResult.schema.map(col => col.name),
        onQueryFilterStringChange: actions.onQueryFilterStringChange,
        onQueryFilterColumnChange: actions.onQueryFilterColumnChange
      }),
      (0, _hyperapp.h)(
        "table",
        { className: "query-table" },
        (0, _hyperapp.h)(
          "thead",
          null,
          (0, _hyperapp.h)(
            "tr",
            { className: "labels" },
            state.queryResult.schema.map(col => (0, _hyperapp.h)(
              "td",
              { key: col.name },
              col.name
            ))
          )
        ),
        (0, _hyperapp.h)(
          "tbody",
          null,
          values.slice((state.queryCurrent - 1) * state.queryChunkSize, (state.queryCurrent - 1) * state.queryChunkSize + state.queryChunkSize).map((row, i) => (0, _hyperapp.h)(
            "tr",
            { key: i },
            row.map((col, i) => (0, _hyperapp.h)(
              "td",
              { key: i },
              col.substr(0, 200)
            ))
          ))
        )
      )
    );
  };

  const filterRow = (row, strs, colIdx) => strs.toLowerCase().split(" ").every(str => row[colIdx] && row[colIdx].toLowerCase().includes(str));
});

},{"./paginator":11,"hyperapp":1}]},{},[4]);

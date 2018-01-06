(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports,require("hyperapp")):"function"==typeof define&&define.amd||e(t.router={},t.hyperapp)}(this,function(t,e){"use strict";function n(t,e,n,o){return{isExact:t,path:e,url:n,params:o}}function o(t){for(var e=t.length;"/"===t[--e];);return t.slice(0,e+1)}var i={state:{pathname:window.location.pathname,previous:window.location.pathname},actions:{go:function(t){history.pushState(null,"",t)},set:function(t){return t}},subscribe:function(t){function e(e){t.set({pathname:window.location.pathname,previous:e.detail?window.location.previous=e.detail:window.location.previous})}var n=function(t){return t.reduce(function(t,e){var n=history[e];return history[e]=function(t,e,o){n.call(this,t,e,o),dispatchEvent(new CustomEvent("pushstate",{detail:t}))},function(){history[e]=n,t&&t()}},null)}(["pushState","replaceState"]);return addEventListener("pushstate",e),addEventListener("popstate",e),function(){removeEventListener("pushstate",e),removeEventListener("popstate",e),n()}}};t.Link=function(t,n){var o=t.to,i=t.location||window.location;return t.href=o,t.onclick=function(e){0!==e.button||e.altKey||e.metaKey||e.ctrlKey||e.shiftKey||"_blank"===t.target||e.currentTarget.origin!==i.origin||(e.preventDefault(),o!==i.pathname&&history.pushState(i.pathname,"",o))},e.h("a",t,n)},t.Route=function(t){var e=t.location||window.location,i=function(t,e,i){if(t===e||!t)return n(t===e,t,e);var a=i&&i.exact,r=o(t).split("/"),c=o(e).split("/");if(!(r.length>c.length||a&&r.length<c.length)){var u=0,s={},p=r.length;for(e="";u<p;u++){if(":"===r[u][0])try{s[r[u].slice(1)]=c[u]=decodeURI(c[u])}catch(t){continue}else if(r[u]!==c[u])return;e+=c[u]+"/"}return n(!1,t,e.slice(0,-1),s)}}(t.path,e.pathname,{exact:!t.parent});return i&&t.render({match:i,location:e})},t.Switch=function(t,e){return e[0]},t.Redirect=function(t){var e=t.location||window.location;history.replaceState(t.from||e.pathname,"",t.to)},t.location=i});

},{"hyperapp":2}],2:[function(require,module,exports){
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd||n(e.hyperapp={})}(this,function(e){"use strict";e.h=function(e,n){for(var r,o=[],t=[],i=arguments.length;i-- >2;)t.push(arguments[i]);for(;t.length;)if(Array.isArray(r=t.pop()))for(i=r.length;i--;)t.push(r[i]);else null==r||!0===r||!1===r||o.push(r);return"string"==typeof e?{name:e,props:n||{},children:o}:e(n||{},o)},e.app=function(e,n,r,o){function t(e,n){return e&&{name:e.nodeName.toLowerCase(),props:{},children:n.call(e.childNodes,function(e){return 3===e.nodeType?e.nodeValue:t(e,n)})}}function i(t){for(y=!y,t=r(e,n),o&&!y&&(N=v(o,N,w,w=t));t=g.pop();)t()}function l(){y||(y=!y,setTimeout(i))}function u(e,n){var r={};for(var o in e)r[o]=e[o];for(var o in n)r[o]=n[o];return r}function f(e,n,r,o){return e.length?(o[e[0]]=1<e.length?f(e.slice(1),n,r[e[0]],{}):n,u(r,o)):n}function c(e,n){for(var r=0;r<e.length;r++)n=n[e[r]];return n}function p(n,r,o){for(var t in o)"function"==typeof o[t]?function(t,i){o[t]=function(t){return r=c(n,e),"function"==typeof(t=i(t))&&(t=t(r,o)),t&&t!==r&&!t.then&&l(e=f(n,u(r,t),e,{})),t}}(t,o[t]):p(n.concat(t),r[t]=r[t]||{},o[t]=u(o[t]))}function s(e){return e&&e.props?e.props.key:null}function a(e,n,r,o){if("key"===n);else if("style"===n)for(var t in u(o,r))e[n][t]=null==r||null==r[t]?"":r[t];else{try{e[n]=null==r?"":r}catch(e){}"function"!=typeof r&&(null==r||!1===r?e.removeAttribute(n):e.setAttribute(n,r))}}function d(e,n){var r="string"==typeof e||"number"==typeof e?document.createTextNode(e):(n=n||"svg"===e.name)?document.createElementNS("http://www.w3.org/2000/svg",e.name):document.createElement(e.name);if(e.props){e.props.oncreate&&g.push(function(){e.props.oncreate(r)});for(var o=0;o<e.children.length;o++)r.appendChild(d(e.children[o],n));for(var t in e.props)a(r,t,e.props[t])}return r}function h(e,n,r){if(r=n.props){for(var o=0;o<n.children.length;o++)h(e.childNodes[o],n.children[o]);r.ondestroy&&r.ondestroy(e)}return e}function m(e,n,r,o){function t(){e.removeChild(h(n,r))}r.props&&(o=r.props.onremove)?o(n,t):t()}function v(e,n,r,o,t,i){if(o===r);else if(null==r)n=e.insertBefore(d(o,t),n);else if(o.name&&o.name===r.name){!function(e,n,r){for(var o in u(n,r))r[o]!==("value"===o||"checked"===o?e[o]:n[o])&&a(e,o,r[o],n[o]);r.onupdate&&g.push(function(){r.onupdate(e,n)})}(n,r.props,o.props);for(var l=[],f={},c={},p=0;p<r.children.length;p++)l[p]=n.childNodes[p],null!=(w=s(y=r.children[p]))&&(f[w]=[l[p],y]);p=0;for(var h=0;h<o.children.length;){var y=r.children[p],N=o.children[h],w=s(y),b=s(N);if(c[w])p++;else if(null==b)null==w&&(v(n,l[p],y,N,t),h++),p++;else{var k=f[b]||[];w===b?(v(n,k[0],k[1],N,t),p++):k[0]?v(n,n.insertBefore(k[0],l[p]),k[1],N,t):v(n,l[p],null,N,t),h++,c[b]=N}}for(;p<r.children.length;)null==s(y=r.children[p])&&m(n,l[p],y),p++;for(var p in f)c[f[p][1].props.key]||m(n,f[p][0],f[p][1])}else o.name===r.name?n.nodeValue=o:(n=e.insertBefore(d(o,t),i=n),m(e,i,r));return n}var y,g=[],N=o&&o.children[0],w=t(N,[].map);return l(p([],e=u(e),n=u(n))),n}});

},{}],3:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "@hyperapp/router"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("@hyperapp/router"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.router);
    global.actions = mod.exports;
  }
})(this, function (exports, _router) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.toggleShowTable = exports.updateTables = exports.updateChunkSize = exports.updateQueryPage = exports.addQueryToHistory = exports.updateQueryResult = exports.updateQueryStatus = exports.onQueryFilterColumnChange = exports.onQueryFilterStringChange = exports.onTruncateChange = exports.updateQuery = exports.selectDatabase = exports.updateDatabases = exports.changePage = exports.handleError = exports.loading = exports.location = undefined;

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

  const location = exports.location = _router.location.actions;

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

  const onTruncateChange = exports.onTruncateChange = queryTruncate => state => ({ queryTruncate });

  const onQueryFilterStringChange = exports.onQueryFilterStringChange = queryFilterString => state => ({
    queryFilterString,
    queryCurrent: 1
  });

  const onQueryFilterColumnChange = exports.onQueryFilterColumnChange = queryFilterColumn => state => ({
    queryFilterColumn,
    queryCurrent: 1
  });

  const updateQueryStatus = exports.updateQueryStatus = queryStatus => state => ({ queryStatus });

  const updateQueryResult = exports.updateQueryResult = queryResult => state => ({
    queryResult,
    queryCurrent: 1
  });

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

},{"@hyperapp/router":1}],4:[function(require,module,exports){
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

  const get = (url, opt) => fetch(url, _extends({}, fetchOptions, opt)).then(res => res.json()).then(resp => resp.error ? resp : resp.data);

  const getDatabaseServer = exports.getDatabaseServer = () => get("/api/database-server");

  const runQuery = exports.runQuery = (db, query) => get("/api/query/" + db + "?q=" + query);

  const getTables = exports.getTables = db => get("/api/tables/" + db);
});

},{}],5:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["hyperapp", "@hyperapp/router", "./state", "./actions", "./api", "./views/loading", "./views/error", "./views/navigation", "./pages/query", "./pages/tables", "./pages/404"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("hyperapp"), require("@hyperapp/router"), require("./state"), require("./actions"), require("./api"), require("./views/loading"), require("./views/error"), require("./views/navigation"), require("./pages/query"), require("./pages/tables"), require("./pages/404"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.hyperapp, global.router, global.state, global.actions, global.api, global.loading, global.error, global.navigation, global.query, global.tables, global._);
    global.app = mod.exports;
  }
})(this, function (_hyperapp, _router, _state, _actions, _api, _loading, _error, _navigation, _query, _tables, _2) {
  "use strict";

  var _state2 = _interopRequireDefault(_state);

  var actions = _interopRequireWildcard(_actions);

  var api = _interopRequireWildcard(_api);

  var _loading2 = _interopRequireDefault(_loading);

  var _error2 = _interopRequireDefault(_error);

  var _navigation2 = _interopRequireDefault(_navigation);

  var _query2 = _interopRequireDefault(_query);

  var _tables2 = _interopRequireDefault(_tables);

  var _3 = _interopRequireDefault(_2);

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

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  const main = (0, _hyperapp.app)(_state2.default, actions, (state, actions) => {
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
        { "class": "content" },
        (0, _hyperapp.h)(
          _router.Switch,
          null,
          (0, _hyperapp.h)(_router.Route, {
            path: "/tables",
            render: () => (0, _hyperapp.h)(_tables2.default, { state: state, actions: actions })
          }),
          (0, _hyperapp.h)(_router.Route, {
            path: "/",
            render: () => (0, _hyperapp.h)(_query2.default, { state: state, actions: actions })
          }),
          (0, _hyperapp.h)(_router.Route, { render: _3.default })
        )
      )
    );
  }, document.body);

  _router.location.subscribe(main.location);

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

},{"./actions":3,"./api":4,"./pages/404":6,"./pages/query":7,"./pages/tables":8,"./state":9,"./views/error":10,"./views/loading":11,"./views/navigation":12,"@hyperapp/router":1,"hyperapp":2}],6:[function(require,module,exports){
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

},{"hyperapp":2}],7:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "hyperapp", "../api", "../views/textarea", "../views/queryResult"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("hyperapp"), require("../api"), require("../views/textarea"), require("../views/queryResult"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.hyperapp, global.api, global.textarea, global.queryResult);
    global.query = mod.exports;
  }
})(this, function (exports, _hyperapp, _api, _textarea, _queryResult) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var api = _interopRequireWildcard(_api);

  var _textarea2 = _interopRequireDefault(_textarea);

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
        { "class": "query-container" },
        (0, _hyperapp.h)(
          "div",
          { "class": "query-textarea-container" },
          (0, _hyperapp.h)(_textarea2.default, {
            oncreate: el => el.focus(),
            value: state.query,
            oninput: e => actions.updateQuery(e.target.value)
          })
        ),
        (0, _hyperapp.h)(
          "div",
          { "class": "query-controls" },
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
              "class": "history-select",
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
    api.runQuery(db, query.replace(/\n/g, " ")).then(data => {
      actions.updateQueryResult(data);
      actions.updateQueryStatus(data.error ? "FAILURE" : "SUCCESS");
      actions.addQueryToHistory(query);
    }).catch(e => {
      actions.updateQueryStatus("FAILURE");
      actions.handleError(e);
    });
  };
});

},{"../api":4,"../views/queryResult":14,"../views/textarea":15,"hyperapp":2}],8:[function(require,module,exports){
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
    const tableDescription = state.tables[state.selectedDatabase] || {
      fetchingStatus: "NOT_ASKED"
    };

    if (tableDescription.fetchingStatus === "NOT_ASKED") {
      fetchTables(state.selectedDatabase, actions);
    }

    return (0, _hyperapp.h)(Tables, {
      db: state.selectedDatabase,
      tableDescription: tableDescription,
      actions: actions
    });
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
              "h2",
              null,
              tableName,
              "\xA0",
              (0, _hyperapp.h)(
                "small",
                { style: { fontWeight: 400 } },
                "(",
                desc.columns.length,
                " columns)"
              ),
              "\xA0",
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
                  { "class": "labels" },
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
                    "Data Type"
                  ),
                  (0, _hyperapp.h)(
                    "td",
                    null,
                    "Default Value"
                  ),
                  (0, _hyperapp.h)(
                    "td",
                    null,
                    "PK"
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
                    row.dataType + (row.characterMaximumLength.valid ? ` (${row.characterMaximumLength.value})` : '')
                  ),
                  (0, _hyperapp.h)(
                    "td",
                    null,
                    row.columnDefault.valid ? row.columnDefault.value : 'NULL'
                  ),
                  (0, _hyperapp.h)(
                    "td",
                    null,
                    row.primaryKey.valid ? '✓ ' : ' '
                  )
                ))
              )
            )
          ))
        );

      case "FAILURE":
        return (0, _hyperapp.h)(
          "pre",
          { "class": "display-error" },
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

},{"../api":4,"hyperapp":2}],9:[function(require,module,exports){
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
    global.state = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const queryHistory = () => {
    const qh = localStorage.getItem("queryHistory");
    if (!qh) return [];
    return JSON.parse(qh) || [];
  };

  exports.default = {
    location: location.state,
    page: "query",
    loading: 0,
    databases: [],
    selectedDatabase: localStorage.getItem("selectedDatabase") || null,
    query: "",
    queryFilterString: "",
    queryFilterColumn: 0,
    queryCurrent: 1,
    queryChunkSize: 50,
    queryTruncate: 50,
    queryHistory: queryHistory(),
    queryResult: null,
    queryStatus: "NOT_ASKED",
    tables: {},
    error: null
  };
});

},{}],10:[function(require,module,exports){
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
    { "class": "error" },
    props.error
  ) : null;
});

},{"hyperapp":2}],11:[function(require,module,exports){
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
    { "class": "loading-indicator" },
    "Loading"
  );
});

},{"hyperapp":2}],12:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "hyperapp", "@hyperapp/router"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("hyperapp"), require("@hyperapp/router"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.hyperapp, global.router);
    global.navigation = mod.exports;
  }
})(this, function (exports, _hyperapp, _router) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = ({ state, actions }) => (0, _hyperapp.h)(
    "div",
    { "class": "navigation" },
    (0, _hyperapp.h)(
      "select",
      {
        "class": "database-selector",
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
      _router.Link,
      { to: "/", "class": getCurrent("/") },
      "Query"
    ),
    (0, _hyperapp.h)(
      _router.Link,
      { to: "/tables", "class": getCurrent("/tables") },
      "Tables"
    )
  );

  const getCurrent = loc => {
    if (!window.location.pathname && loc === "/") return "current";
    return window.location.pathname === loc ? "current" : "";
  };
});

},{"@hyperapp/router":1,"hyperapp":2}],13:[function(require,module,exports){
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
    { "class": "paginator" },
    (0, _hyperapp.h)(
      "button",
      {
        "class": "paginator__button",
        onclick: e => props.onPageChange(props.current - 1),
        disabled: props.current === 1
      },
      "Prev"
    ),
    (0, _hyperapp.h)(
      "div",
      { "class": "paginator__numbers" },
      props.current,
      " / ",
      props.total
    ),
    (0, _hyperapp.h)(
      "button",
      {
        "class": "paginator__button",
        onclick: e => props.onPageChange(props.current + 1),
        disabled: props.current === props.total
      },
      "Next"
    ),
    (0, _hyperapp.h)(
      "div",
      { "class": "paginator__chunks" },
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
      { "class": "paginator__truncate" },
      (0, _hyperapp.h)(
        "span",
        null,
        "Truncate"
      ),
      (0, _hyperapp.h)(
        "select",
        { onchange: e => props.onTruncateChange(Number(e.target.value)) },
        (0, _hyperapp.h)(
          "option",
          { value: "20", selected: props.queryTruncate === 20 },
          "20"
        ),
        (0, _hyperapp.h)(
          "option",
          { value: "50", selected: props.queryTruncate === 50 },
          "50"
        ),
        (0, _hyperapp.h)(
          "option",
          { value: "200", selected: props.queryTruncate === 200 },
          "200"
        ),
        (0, _hyperapp.h)(
          "option",
          { value: "1000", selected: props.queryTruncate === 1000 },
          "1000"
        ),
        (0, _hyperapp.h)(
          "option",
          { value: "-1", selected: props.queryTruncate === -1 },
          "None"
        )
      )
    ),
    (0, _hyperapp.h)(
      "div",
      { "class": "paginator__filter" },
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

},{"hyperapp":2}],14:[function(require,module,exports){
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
          { "class": "display-error" },
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
      { "class": "query-result-container" },
      (0, _hyperapp.h)(_paginator2.default, {
        onPageChange: actions.updateQueryPage,
        current: state.queryCurrent,
        total: Math.ceil(values.length / state.queryChunkSize),
        queryChunkSize: state.queryChunkSize,
        onChunkSizeChange: actions.updateChunkSize,
        queryTruncate: state.queryTruncate,
        onTruncateChange: actions.onTruncateChange,
        queryFilterString: state.queryFilterString,
        queryFilterColumn: state.queryFilterColumn,
        columnNames: state.queryResult.schema.map(col => col.name),
        onQueryFilterStringChange: actions.onQueryFilterStringChange,
        onQueryFilterColumnChange: actions.onQueryFilterColumnChange
      }),
      (0, _hyperapp.h)(
        "table",
        { "class": "query-table" },
        (0, _hyperapp.h)(
          "thead",
          null,
          (0, _hyperapp.h)(
            "tr",
            { "class": "labels" },
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
              truncate(col, state.queryTruncate)
            ))
          ))
        )
      )
    );
  };

  const filterRow = (row, strs, colIdx) => strs.toLowerCase().split(" ").every(str => row[colIdx] && row[colIdx].toLowerCase().includes(str));

  const truncate = (str, len) => {
    if (len === -1 || str.length < len - 3) return str;
    return str.substr(0, len) + "…";
  };
});

},{"./paginator":13,"hyperapp":2}],15:[function(require,module,exports){
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
    global.textarea = mod.exports;
  }
})(this, function (exports, _hyperapp) {
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

  function _objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  }

  exports.default = (() => {
    let baseScrollHeight;
    return p => {
      const { rows = 3, oncreate, oninput } = p,
            props = _objectWithoutProperties(p, ["rows", "oncreate", "oninput"]);
      return (0, _hyperapp.h)("textarea", _extends({}, props, {
        rows: rows,
        oncreate: function (textarea) {
          const val = textarea.value;
          textarea.value = "";
          baseScrollHeight = textarea.scrollHeight;
          textarea.value = val;
          if (oncreate) oncreate(textarea);
        },
        oninput: e => {
          e.target.rows = rows;
          const addedRows = Math.ceil((e.target.scrollHeight - baseScrollHeight) / 18);
          e.target.rows = rows + addedRows;
          if (oninput) oninput(e);
        }
      }));
    };
  })();
});

},{"hyperapp":2}]},{},[5]);

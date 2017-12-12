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
  const loading = exports.loading = n => state => ({
    loading: Math.max(0, state.loading + n)
  });

  const handleError = exports.handleError = error => state => ({ error: error.message });

  const updateDatabases = exports.updateDatabases = databases => state => {
    return databases.includes(state.selectedDatabase) ? { databases } : { databases, selectedDatabase: databases[0] };
  };

  const selectDatabase = exports.selectDatabase = selectedDatabase => state => {
    localStorage.setItem("selectedDatabase", selectedDatabase);
    return { selectedDatabase };
  };

  const updateQuery = exports.updateQuery = query => state => ({ query });

  const updateQueryResult = exports.updateQueryResult = queryResult => state => ({ queryResult });

  const addQueryToHistory = exports.addQueryToHistory = query => state => {
    const queryHistory = [query, ...state.queryHistory].slice(0, 20);
    localStorage.setItem("queryHistory", JSON.stringify(queryHistory));
    return { queryHistory };
  };
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
});

},{}],4:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["hyperapp", "./actions", "./api", "./views/loading", "./views/error", "./pages/query"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("hyperapp"), require("./actions"), require("./api"), require("./views/loading"), require("./views/error"), require("./pages/query"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.hyperapp, global.actions, global.api, global.loading, global.error, global.query);
    global.app = mod.exports;
  }
})(this, function (_hyperapp, _actions, _api, _loading, _error, _query) {
  "use strict";

  var actions = _interopRequireWildcard(_actions);

  var api = _interopRequireWildcard(_api);

  var _loading2 = _interopRequireDefault(_loading);

  var _error2 = _interopRequireDefault(_error);

  var _query2 = _interopRequireDefault(_query);

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
    query: _query2.default
  };

  const queryHistory = () => {
    const a = localStorage.getItem("queryHistory");
    if (!a) return [];
    const b = JSON.parse(a);
    return b || [];
  };

  (0, _hyperapp.app)({
    state: {
      page: "query",
      loading: 0,
      databases: [],
      selectedDatabase: localStorage.getItem("selectedDatabase") || null,
      query: "",
      queryHistory: queryHistory(),
      error: null
    },
    actions,
    view: state => actions => {
      const Page = pages[state.page];
      return (0, _hyperapp.h)(
        "main",
        { oncreate: () => fetchDatabases(actions) },
        (0, _hyperapp.h)(_error2.default, { error: state.error }),
        (0, _hyperapp.h)(_loading2.default, { count: state.loading }),
        (0, _hyperapp.h)(Page, { state: state, actions: actions })
      );
    }
  });

  const fetchDatabases = async actions => {
    actions.loading(1);
    try {
      const data = await api.getDatabaseServer();
      actions.updateDatabases(data.databases);
    } catch (e) {
      actions.handleError(e);
    }
    actions.loading(-1);
  };
});

},{"./actions":2,"./api":3,"./pages/query":5,"./views/error":6,"./views/loading":7,"hyperapp":1}],5:[function(require,module,exports){
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
    global.query = mod.exports;
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

  exports.default = ({ state, actions }) => {
    return (0, _hyperapp.h)(
      "div",
      null,
      state.databases.length > 0 && (0, _hyperapp.h)(
        "select",
        { onchange: e => actions.selectDatabase(e.target.value) },
        state.databases.map(db => (0, _hyperapp.h)(
          "option",
          { value: db, selected: db === state.selectedDatabase },
          db
        ))
      ),
      (0, _hyperapp.h)("textarea", {
        value: state.query,
        oninput: e => actions.updateQuery(e.target.value)
      }),
      (0, _hyperapp.h)(
        "button",
        {
          onclick: () => runQuery(state.selectedDatabase, state.query, actions)
        },
        "Run"
      ),
      (0, _hyperapp.h)(
        "select",
        { onchange: e => actions.updateQuery(e.target.value) },
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
      ),
      (0, _hyperapp.h)("hr", null),
      state.queryResult && (0, _hyperapp.h)(
        "table",
        null,
        (0, _hyperapp.h)(
          "thead",
          null,
          (0, _hyperapp.h)(
            "tr",
            null,
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
          state.queryResult.values.map((row, i) => (0, _hyperapp.h)(
            "tr",
            { key: i },
            row.map((col, i) => (0, _hyperapp.h)(
              "td",
              { key: i },
              col
            ))
          ))
        )
      )
    );
  };

  const runQuery = async (db, query, actions) => {
    actions.loading(1);
    try {
      const data = await api.runQuery(db, query);
      actions.updateQueryResult(data);
      actions.addQueryToHistory(query);
    } catch (e) {
      actions.handleError(e);
    }
    actions.loading(-1);
  };
});

},{"../api":3,"hyperapp":1}],6:[function(require,module,exports){
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

},{"hyperapp":1}],7:[function(require,module,exports){
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

},{"hyperapp":1}]},{},[4]);

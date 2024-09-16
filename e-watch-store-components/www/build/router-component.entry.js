import { g as getRenderingRef, f as forceUpdate, a as Build, r as registerInstance, h, e as Host } from './index-48480441.js';

const appendToMap = (map, propName, value) => {
    const items = map.get(propName);
    if (!items) {
        map.set(propName, [value]);
    }
    else if (!items.includes(value)) {
        items.push(value);
    }
};
const debounce = (fn, ms) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            timeoutId = 0;
            fn(...args);
        }, ms);
    };
};

/**
 * Check if a possible element isConnected.
 * The property might not be there, so we check for it.
 *
 * We want it to return true if isConnected is not a property,
 * otherwise we would remove these elements and would not update.
 *
 * Better leak in Edge than to be useless.
 */
const isConnected = (maybeElement) => !('isConnected' in maybeElement) || maybeElement.isConnected;
const cleanupElements = debounce((map) => {
    for (let key of map.keys()) {
        map.set(key, map.get(key).filter(isConnected));
    }
}, 2000);
const stencilSubscription = () => {
    if (typeof getRenderingRef !== 'function') {
        // If we are not in a stencil project, we do nothing.
        // This function is not really exported by @stencil/core.
        return {};
    }
    const elmsToUpdate = new Map();
    return {
        dispose: () => elmsToUpdate.clear(),
        get: (propName) => {
            const elm = getRenderingRef();
            if (elm) {
                appendToMap(elmsToUpdate, propName, elm);
            }
        },
        set: (propName) => {
            const elements = elmsToUpdate.get(propName);
            if (elements) {
                elmsToUpdate.set(propName, elements.filter(forceUpdate));
            }
            cleanupElements(elmsToUpdate);
        },
        reset: () => {
            elmsToUpdate.forEach((elms) => elms.forEach(forceUpdate));
            cleanupElements(elmsToUpdate);
        },
    };
};

const createObservableMap = (defaultState, shouldUpdate = (a, b) => a !== b) => {
    let states = new Map(Object.entries(defaultState !== null && defaultState !== void 0 ? defaultState : {}));
    const handlers = {
        dispose: [],
        get: [],
        set: [],
        reset: [],
    };
    const reset = () => {
        states = new Map(Object.entries(defaultState !== null && defaultState !== void 0 ? defaultState : {}));
        handlers.reset.forEach((cb) => cb());
    };
    const dispose = () => {
        // Call first dispose as resetting the state would
        // cause less updates ;)
        handlers.dispose.forEach((cb) => cb());
        reset();
    };
    const get = (propName) => {
        handlers.get.forEach((cb) => cb(propName));
        return states.get(propName);
    };
    const set = (propName, value) => {
        const oldValue = states.get(propName);
        if (shouldUpdate(value, oldValue, propName)) {
            states.set(propName, value);
            handlers.set.forEach((cb) => cb(propName, value, oldValue));
        }
    };
    const state = (typeof Proxy === 'undefined'
        ? {}
        : new Proxy(defaultState, {
            get(_, propName) {
                return get(propName);
            },
            ownKeys(_) {
                return Array.from(states.keys());
            },
            getOwnPropertyDescriptor() {
                return {
                    enumerable: true,
                    configurable: true,
                };
            },
            has(_, propName) {
                return states.has(propName);
            },
            set(_, propName, value) {
                set(propName, value);
                return true;
            },
        }));
    const on = (eventName, callback) => {
        handlers[eventName].push(callback);
        return () => {
            removeFromArray(handlers[eventName], callback);
        };
    };
    const onChange = (propName, cb) => {
        const unSet = on('set', (key, newValue) => {
            if (key === propName) {
                cb(newValue);
            }
        });
        const unReset = on('reset', () => cb(defaultState[propName]));
        return () => {
            unSet();
            unReset();
        };
    };
    const use = (...subscriptions) => {
        const unsubs = subscriptions.reduce((unsubs, subscription) => {
            if (subscription.set) {
                unsubs.push(on('set', subscription.set));
            }
            if (subscription.get) {
                unsubs.push(on('get', subscription.get));
            }
            if (subscription.reset) {
                unsubs.push(on('reset', subscription.reset));
            }
            if (subscription.dispose) {
                unsubs.push(on('dispose', subscription.dispose));
            }
            return unsubs;
        }, []);
        return () => unsubs.forEach((unsub) => unsub());
    };
    const forceUpdate = (key) => {
        const oldValue = states.get(key);
        handlers.set.forEach((cb) => cb(key, oldValue, oldValue));
    };
    return {
        state,
        get,
        set,
        on,
        onChange,
        use,
        dispose,
        reset,
        forceUpdate,
    };
};
const removeFromArray = (array, item) => {
    const index = array.indexOf(item);
    if (index >= 0) {
        array[index] = array[array.length - 1];
        array.length--;
    }
};

const createStore = (defaultState, shouldUpdate) => {
    const map = createObservableMap(defaultState, shouldUpdate);
    map.use(stencilSubscription());
    return map;
};

let defaultRouter;
const createRouter = (opts) => {
    var _a;
    const win = window;
    const url = new URL(win.location.href);
    const parseURL = (_a = opts === null || opts === void 0 ? void 0 : opts.parseURL) !== null && _a !== void 0 ? _a : DEFAULT_PARSE_URL;
    const { state, onChange, dispose } = createStore({
        url,
        activePath: parseURL(url)
    }, (newV, oldV, prop) => {
        if (prop === 'url') {
            return newV.href !== oldV.href;
        }
        return newV !== oldV;
    });
    const push = (href) => {
        history.pushState(null, null, href);
        const url = new URL(href, document.baseURI);
        state.url = url;
        state.activePath = parseURL(url);
    };
    const match = (routes) => {
        const { activePath } = state;
        for (let route of routes) {
            const params = matchPath(activePath, route.path);
            if (params) {
                if (route.to != null) {
                    const to = (typeof route.to === 'string')
                        ? route.to
                        : route.to(activePath);
                    push(to);
                    return match(routes);
                }
                else {
                    return { params, route };
                }
            }
        }
        return undefined;
    };
    const navigationChanged = () => {
        const url = new URL(win.location.href);
        state.url = url;
        state.activePath = parseURL(url);
    };
    const Switch = (_, childrenRoutes) => {
        const result = match(childrenRoutes);
        if (result) {
            if (typeof result.route.jsx === 'function') {
                return result.route.jsx(result.params);
            }
            else {
                return result.route.jsx;
            }
        }
    };
    const disposeRouter = () => {
        defaultRouter = undefined;
        win.removeEventListener('popstate', navigationChanged);
        dispose();
    };
    const router = defaultRouter = {
        Switch,
        get url() {
            return state.url;
        },
        get activePath() {
            return state.activePath;
        },
        push,
        onChange: onChange,
        dispose: disposeRouter,
    };
    // Initial update
    navigationChanged();
    // Listen URL changes
    win.addEventListener('popstate', navigationChanged);
    return router;
};
const Route = (props, children) => {
    var _a;
    if ('to' in props) {
        return {
            path: props.path,
            to: props.to,
        };
    }
    if (Build.isDev && props.render && children.length > 0) {
        console.warn('Route: if `render` is provided, the component should not have any children');
    }
    return {
        path: props.path,
        id: props.id,
        jsx: (_a = props.render) !== null && _a !== void 0 ? _a : children,
    };
};
const href = (href, router = defaultRouter) => {
    if (Build.isDev && !router) {
        throw new Error('Router must be defined in href');
    }
    return {
        href,
        onClick: (ev) => {
            if (ev.metaKey || ev.ctrlKey) {
                return;
            }
            if (ev.which == 2 || ev.button == 1) {
                return;
            }
            ev.preventDefault();
            router.push(href);
        },
    };
};
const matchPath = (pathname, path) => {
    if (typeof path === 'string') {
        if (path === pathname) {
            return {};
        }
    }
    else if (typeof path === 'function') {
        const params = path(pathname);
        if (params) {
            return params === true
                ? {}
                : { ...params };
        }
    }
    else {
        const results = path.exec(pathname);
        if (results) {
            path.lastIndex = 0;
            return { ...results };
        }
    }
    return undefined;
};
const DEFAULT_PARSE_URL = (url) => {
    return url.pathname.toLowerCase();
};
const NotFound = () => ({});

/**
 * TS adaption of https://github.com/pillarjs/path-to-regexp/blob/master/index.js
 */
/**
 * Default configs.
 */
const DEFAULT_DELIMITER = '/';
const DEFAULT_DELIMITERS = './';
/**
 * The main path matching regexp utility.
 */
const PATH_REGEXP = new RegExp([
    // Match escaped characters that would otherwise appear in future matches.
    // This allows the user to escape special characters that won't transform.
    '(\\\\.)',
    // Match Express-style parameters and un-named parameters with a prefix
    // and optional suffixes. Matches appear as:
    //
    // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?"]
    // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined]
    '(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?'
].join('|'), 'g');
/**
 * Parse a string for the raw tokens.
 */
const parse = (str, options) => {
    var tokens = [];
    var key = 0;
    var index = 0;
    var path = '';
    var defaultDelimiter = (options && options.delimiter) || DEFAULT_DELIMITER;
    var delimiters = (options && options.delimiters) || DEFAULT_DELIMITERS;
    var pathEscaped = false;
    var res;
    while ((res = PATH_REGEXP.exec(str)) !== null) {
        var m = res[0];
        var escaped = res[1];
        var offset = res.index;
        path += str.slice(index, offset);
        index = offset + m.length;
        // Ignore already escaped sequences.
        if (escaped) {
            path += escaped[1];
            pathEscaped = true;
            continue;
        }
        var prev = '';
        var next = str[index];
        var name = res[2];
        var capture = res[3];
        var group = res[4];
        var modifier = res[5];
        if (!pathEscaped && path.length) {
            var k = path.length - 1;
            if (delimiters.indexOf(path[k]) > -1) {
                prev = path[k];
                path = path.slice(0, k);
            }
        }
        // Push the current path onto the tokens.
        if (path) {
            tokens.push(path);
            path = '';
            pathEscaped = false;
        }
        var partial = prev !== '' && next !== undefined && next !== prev;
        var repeat = modifier === '+' || modifier === '*';
        var optional = modifier === '?' || modifier === '*';
        var delimiter = prev || defaultDelimiter;
        var pattern = capture || group;
        tokens.push({
            name: name || key++,
            prefix: prev,
            delimiter: delimiter,
            optional: optional,
            repeat: repeat,
            partial: partial,
            pattern: pattern ? escapeGroup(pattern) : '[^' + escapeString(delimiter) + ']+?'
        });
    }
    // Push any remaining characters.
    if (path || index < str.length) {
        tokens.push(path + str.substr(index));
    }
    return tokens;
};
/**
 * Escape a regular expression string.
 */
const escapeString = (str) => {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');
};
/**
 * Escape the capturing group by escaping special characters and meaning.
 */
const escapeGroup = (group) => {
    return group.replace(/([=!:$/()])/g, '\\$1');
};
/**
 * Get the flags for a regexp from the options.
 */
const flags = (options) => {
    return options && options.sensitive ? '' : 'i';
};
/**
 * Pull out keys from a regexp.
 */
const regexpToRegexp = (path, keys) => {
    if (!keys)
        return path;
    // Use a negative lookahead to match only capturing groups.
    var groups = path.source.match(/\((?!\?)/g);
    if (groups) {
        for (var i = 0; i < groups.length; i++) {
            keys.push({
                name: i,
                prefix: null,
                delimiter: null,
                optional: false,
                repeat: false,
                partial: false,
                pattern: null
            });
        }
    }
    return path;
};
/**
 * Transform an array into a regexp.
 */
const arrayToRegexp = (path, keys, options) => {
    var parts = [];
    for (var i = 0; i < path.length; i++) {
        parts.push(pathToRegexp(path[i], keys, options).source);
    }
    return new RegExp('(?:' + parts.join('|') + ')', flags(options));
};
/**
 * Create a path regexp from string input.
 */
const stringToRegexp = (path, keys, options) => {
    return tokensToRegExp(parse(path, options), keys, options);
};
/**
 * Expose a function for taking tokens and returning a RegExp.
 */
const tokensToRegExp = (tokens, keys, options) => {
    options = options || {};
    var strict = options.strict;
    var end = options.end !== false;
    var delimiter = escapeString(options.delimiter || DEFAULT_DELIMITER);
    var delimiters = options.delimiters || DEFAULT_DELIMITERS;
    var endsWith = [].concat(options.endsWith || []).map(escapeString).concat('$').join('|');
    var route = '';
    var isEndDelimited = false;
    // Iterate over the tokens and create our regexp string.
    for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        if (typeof token === 'string') {
            route += escapeString(token);
            isEndDelimited = i === tokens.length - 1 && delimiters.indexOf(token[token.length - 1]) > -1;
        }
        else {
            var prefix = escapeString(token.prefix || '');
            var capture = token.repeat
                ? '(?:' + token.pattern + ')(?:' + prefix + '(?:' + token.pattern + '))*'
                : token.pattern;
            if (keys)
                keys.push(token);
            if (token.optional) {
                if (token.partial) {
                    route += prefix + '(' + capture + ')?';
                }
                else {
                    route += '(?:' + prefix + '(' + capture + '))?';
                }
            }
            else {
                route += prefix + '(' + capture + ')';
            }
        }
    }
    if (end) {
        if (!strict)
            route += '(?:' + delimiter + ')?';
        route += endsWith === '$' ? '$' : '(?=' + endsWith + ')';
    }
    else {
        if (!strict)
            route += '(?:' + delimiter + '(?=' + endsWith + '))?';
        if (!isEndDelimited)
            route += '(?=' + delimiter + '|' + endsWith + ')';
    }
    return new RegExp('^' + route, flags(options));
};
/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 */
const pathToRegexp = (path, keys, options) => {
    if (path instanceof RegExp) {
        return regexpToRegexp(path, keys);
    }
    if (Array.isArray(path)) {
        return arrayToRegexp(path, keys, options);
    }
    return stringToRegexp(path, keys, options);
};

let cacheCount = 0;
const patternCache = {};
const cacheLimit = 10000;
// Memoized function for creating the path match regex
const compilePath = (pattern, options) => {
    const cacheKey = `${options.end}${options.strict}`;
    const cache = patternCache[cacheKey] || (patternCache[cacheKey] = {});
    const cachePattern = JSON.stringify(pattern);
    if (cache[cachePattern]) {
        return cache[cachePattern];
    }
    const keys = [];
    const re = pathToRegexp(pattern, keys, options);
    const compiledPattern = { re, keys };
    if (cacheCount < cacheLimit) {
        cache[cachePattern] = compiledPattern;
        cacheCount += 1;
    }
    return compiledPattern;
};
const match = (pathname, options = {}) => {
    const { exact = false, strict = false } = options;
    const { re, keys } = compilePath(pathname, { end: exact, strict });
    return (path) => {
        const match = re.exec(path);
        if (!match) {
            return undefined;
        }
        const [url, ...values] = match;
        const isExact = path === url;
        if (exact && !isExact) {
            return undefined;
        }
        return keys.reduce((memo, key, index) => {
            memo[key.name] = values[index];
            return memo;
        }, {});
    };
};

const route = createRouter();
const RouterComponent = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h(Host, { key: 'cddc4a23d0ff684897b10649efd2c0a3ae72f1cf' }, h(route.Switch, { key: '46bc7df9de92121f637033da555ea7607e33bcd7' }, h(Route, { key: 'ed26a2e633c78a6d82fa2395c1a87e89b6668433', path: "/" }, h("home-component", { key: 'b5ee3d5b7911fed0ddfac5c33567ad825e1ff616' })), h(Route, { key: 'ba79f6890f45bf09055e3a305c76a1c470a8efe8', path: "/home" }, h("home-component", { key: '79a09403e5270490e86dd2fec4fa13db1c17cb37' })), h(Route, { key: '148deebe7ba84d3c97628d12f3d4aec8a7edd7d9', path: "/signup" }, h("signup-component", { key: '6d0e316b899d57810739cf7305a3ca2f8fa48dce' })), h(Route, { key: '5a197d10a355ae4266ff50703ed8d98bce0aede7', path: "/login" }, h("login-component", { key: 'e8a79788674da801a95c412c79951a109a3184a8' })), h(Route, { key: '1a58c895aa4be045fc509112d47612dabbd8e1e3', path: "/admin-login" }, h("admin-login", { key: 'a62020a105538797f7f3061c876a7a1df81dc7a2' })), h(Route, { key: 'e8ef76ea26cb50732bbce7e9e4140364d0cd539a', path: "/admin-dashboard" }, h("admin-dashboard", { key: '96abd7bea9ff0e57059444cd85b63af67da806a0' })), h(Route, { key: '8866466b348dd46fd9bbc62b9341211f764d731d', path: "/cart" }, h("cart-component", { key: 'f675364c539b37293dd52f700f9b83af1dbc9fe5' })), h(Route, { key: '355574a08f384f41d63b4b9e6c64e47f60e57cbe', path: /.*/ }, h("not-found", { key: '3b4935d21cf302bf561bcb22a733121dda215a9a' })))));
    }
};

export { RouterComponent as router_component };

//# sourceMappingURL=router-component.entry.js.map
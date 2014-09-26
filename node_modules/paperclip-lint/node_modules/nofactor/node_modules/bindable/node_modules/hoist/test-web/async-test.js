(function() {
    var modules = {}, definitions = {};
    var _require = function(path) {
        if (modules[path]) return modules[path];
        var module = {
            exports: {}
        }, definition = definitions[path];
        if (!definition) {
            try {
                return require(path);
            } catch (e) {}
            throw new Error("unable to load " + path);
        }
        return modules[path] = module.exports = definition(_require, module, module.exports, path);
    };
    var define = function(path, definition) {
        definitions[path] = definition;
    };
    if (typeof global == "undefined") {
        global = window;
    }
    if (typeof window == "undefined") {
        global.window = global;
    }
    if (typeof window.process == "undefined") {
        window.process = {};
    }
    define("hoist/test-web/async-test.js", function(require, module, exports, __dirname, __filename) {
        var hoist = require("hoist/lib/index.js"), expect = require("expect.js/expect.js");
        describe("async", function() {
            it("can asynchronously cast a value", function(next) {
                hoist.cast(Number).map(function(value, next) {
                    setTimeout(next, 1, null, 10);
                }).call(null, "5", function(err, value) {
                    expect(value).to.be(10);
                    next();
                });
            });
            it("can asynchronously map multiple values", function(next) {
                hoist.cast(Number).map(function(value, next) {
                    setTimeout(next, 1, null, 10);
                }).map(function(value, next) {
                    expect(value).to.be(10);
                    setTimeout(next, 1, null, 20);
                }).call(null, "5", function(err, value) {
                    expect(value).to.be(20);
                    next();
                });
            });
        });
        return module.exports;
    });
    define("hoist/lib/index.js", function(require, module, exports, __dirname, __filename) {
        (function() {
            var method, transformer, _fn, _i, _len, _ref, _this = this;
            transformer = require("hoist/lib/transformer.js");
            module.exports = transformer;
            _ref = [ "cast", "map", "preCast", "preMap", "postCast", "postMap" ];
            _fn = function(method) {
                return module.exports[method] = function() {
                    var t;
                    t = transformer();
                    return t[method].apply(t, arguments);
                };
            };
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                method = _ref[_i];
                _fn(method);
            }
        }).call(this);
        return module.exports;
    });
    define("expect.js/expect.js", function(require, module, exports, __dirname, __filename) {
        (function(global, module) {
            if ("undefined" == typeof module) {
                var module = {
                    exports: {}
                }, exports = module.exports;
            }
            module.exports = expect;
            expect.Assertion = Assertion;
            expect.version = "0.1.2";
            var flags = {
                not: [ "to", "be", "have", "include", "only" ],
                to: [ "be", "have", "include", "only", "not" ],
                only: [ "have" ],
                have: [ "own" ],
                be: [ "an" ]
            };
            function expect(obj) {
                return new Assertion(obj);
            }
            function Assertion(obj, flag, parent) {
                this.obj = obj;
                this.flags = {};
                if (undefined != parent) {
                    this.flags[flag] = true;
                    for (var i in parent.flags) {
                        if (parent.flags.hasOwnProperty(i)) {
                            this.flags[i] = true;
                        }
                    }
                }
                var $flags = flag ? flags[flag] : keys(flags), self = this;
                if ($flags) {
                    for (var i = 0, l = $flags.length; i < l; i++) {
                        if (this.flags[$flags[i]]) continue;
                        var name = $flags[i], assertion = new Assertion(this.obj, name, this);
                        if ("function" == typeof Assertion.prototype[name]) {
                            var old = this[name];
                            this[name] = function() {
                                return old.apply(self, arguments);
                            };
                            for (var fn in Assertion.prototype) {
                                if (Assertion.prototype.hasOwnProperty(fn) && fn != name) {
                                    this[name][fn] = bind(assertion[fn], assertion);
                                }
                            }
                        } else {
                            this[name] = assertion;
                        }
                    }
                }
            }
            Assertion.prototype.assert = function(truth, msg, error) {
                var msg = this.flags.not ? error : msg, ok = this.flags.not ? !truth : truth;
                if (!ok) {
                    throw new Error(msg.call(this));
                }
                this.and = new Assertion(this.obj);
            };
            Assertion.prototype.ok = function() {
                this.assert(!!this.obj, function() {
                    return "expected " + i(this.obj) + " to be truthy";
                }, function() {
                    return "expected " + i(this.obj) + " to be falsy";
                });
            };
            Assertion.prototype.throwError = Assertion.prototype.throwException = function(fn) {
                expect(this.obj).to.be.a("function");
                var thrown = false, not = this.flags.not;
                try {
                    this.obj();
                } catch (e) {
                    if ("function" == typeof fn) {
                        fn(e);
                    } else if ("object" == typeof fn) {
                        var subject = "string" == typeof e ? e : e.message;
                        if (not) {
                            expect(subject).to.not.match(fn);
                        } else {
                            expect(subject).to.match(fn);
                        }
                    }
                    thrown = true;
                }
                if ("object" == typeof fn && not) {
                    this.flags.not = false;
                }
                var name = this.obj.name || "fn";
                this.assert(thrown, function() {
                    return "expected " + name + " to throw an exception";
                }, function() {
                    return "expected " + name + " not to throw an exception";
                });
            };
            Assertion.prototype.empty = function() {
                var expectation;
                if ("object" == typeof this.obj && null !== this.obj && !isArray(this.obj)) {
                    if ("number" == typeof this.obj.length) {
                        expectation = !this.obj.length;
                    } else {
                        expectation = !keys(this.obj).length;
                    }
                } else {
                    if ("string" != typeof this.obj) {
                        expect(this.obj).to.be.an("object");
                    }
                    expect(this.obj).to.have.property("length");
                    expectation = !this.obj.length;
                }
                this.assert(expectation, function() {
                    return "expected " + i(this.obj) + " to be empty";
                }, function() {
                    return "expected " + i(this.obj) + " to not be empty";
                });
                return this;
            };
            Assertion.prototype.be = Assertion.prototype.equal = function(obj) {
                this.assert(obj === this.obj, function() {
                    return "expected " + i(this.obj) + " to equal " + i(obj);
                }, function() {
                    return "expected " + i(this.obj) + " to not equal " + i(obj);
                });
                return this;
            };
            Assertion.prototype.eql = function(obj) {
                this.assert(expect.eql(obj, this.obj), function() {
                    return "expected " + i(this.obj) + " to sort of equal " + i(obj);
                }, function() {
                    return "expected " + i(this.obj) + " to sort of not equal " + i(obj);
                });
                return this;
            };
            Assertion.prototype.within = function(start, finish) {
                var range = start + ".." + finish;
                this.assert(this.obj >= start && this.obj <= finish, function() {
                    return "expected " + i(this.obj) + " to be within " + range;
                }, function() {
                    return "expected " + i(this.obj) + " to not be within " + range;
                });
                return this;
            };
            Assertion.prototype.a = Assertion.prototype.an = function(type) {
                if ("string" == typeof type) {
                    var n = /^[aeiou]/.test(type) ? "n" : "";
                    this.assert("array" == type ? isArray(this.obj) : "object" == type ? "object" == typeof this.obj && null !== this.obj : type == typeof this.obj, function() {
                        return "expected " + i(this.obj) + " to be a" + n + " " + type;
                    }, function() {
                        return "expected " + i(this.obj) + " not to be a" + n + " " + type;
                    });
                } else {
                    var name = type.name || "supplied constructor";
                    this.assert(this.obj instanceof type, function() {
                        return "expected " + i(this.obj) + " to be an instance of " + name;
                    }, function() {
                        return "expected " + i(this.obj) + " not to be an instance of " + name;
                    });
                }
                return this;
            };
            Assertion.prototype.greaterThan = Assertion.prototype.above = function(n) {
                this.assert(this.obj > n, function() {
                    return "expected " + i(this.obj) + " to be above " + n;
                }, function() {
                    return "expected " + i(this.obj) + " to be below " + n;
                });
                return this;
            };
            Assertion.prototype.lessThan = Assertion.prototype.below = function(n) {
                this.assert(this.obj < n, function() {
                    return "expected " + i(this.obj) + " to be below " + n;
                }, function() {
                    return "expected " + i(this.obj) + " to be above " + n;
                });
                return this;
            };
            Assertion.prototype.match = function(regexp) {
                this.assert(regexp.exec(this.obj), function() {
                    return "expected " + i(this.obj) + " to match " + regexp;
                }, function() {
                    return "expected " + i(this.obj) + " not to match " + regexp;
                });
                return this;
            };
            Assertion.prototype.length = function(n) {
                expect(this.obj).to.have.property("length");
                var len = this.obj.length;
                this.assert(n == len, function() {
                    return "expected " + i(this.obj) + " to have a length of " + n + " but got " + len;
                }, function() {
                    return "expected " + i(this.obj) + " to not have a length of " + len;
                });
                return this;
            };
            Assertion.prototype.property = function(name, val) {
                if (this.flags.own) {
                    this.assert(Object.prototype.hasOwnProperty.call(this.obj, name), function() {
                        return "expected " + i(this.obj) + " to have own property " + i(name);
                    }, function() {
                        return "expected " + i(this.obj) + " to not have own property " + i(name);
                    });
                    return this;
                }
                if (this.flags.not && undefined !== val) {
                    if (undefined === this.obj[name]) {
                        throw new Error(i(this.obj) + " has no property " + i(name));
                    }
                } else {
                    var hasProp;
                    try {
                        hasProp = name in this.obj;
                    } catch (e) {
                        hasProp = undefined !== this.obj[name];
                    }
                    this.assert(hasProp, function() {
                        return "expected " + i(this.obj) + " to have a property " + i(name);
                    }, function() {
                        return "expected " + i(this.obj) + " to not have a property " + i(name);
                    });
                }
                if (undefined !== val) {
                    this.assert(val === this.obj[name], function() {
                        return "expected " + i(this.obj) + " to have a property " + i(name) + " of " + i(val) + ", but got " + i(this.obj[name]);
                    }, function() {
                        return "expected " + i(this.obj) + " to not have a property " + i(name) + " of " + i(val);
                    });
                }
                this.obj = this.obj[name];
                return this;
            };
            Assertion.prototype.string = Assertion.prototype.contain = function(obj) {
                if ("string" == typeof this.obj) {
                    this.assert(~this.obj.indexOf(obj), function() {
                        return "expected " + i(this.obj) + " to contain " + i(obj);
                    }, function() {
                        return "expected " + i(this.obj) + " to not contain " + i(obj);
                    });
                } else {
                    this.assert(~indexOf(this.obj, obj), function() {
                        return "expected " + i(this.obj) + " to contain " + i(obj);
                    }, function() {
                        return "expected " + i(this.obj) + " to not contain " + i(obj);
                    });
                }
                return this;
            };
            Assertion.prototype.key = Assertion.prototype.keys = function($keys) {
                var str, ok = true;
                $keys = isArray($keys) ? $keys : Array.prototype.slice.call(arguments);
                if (!$keys.length) throw new Error("keys required");
                var actual = keys(this.obj), len = $keys.length;
                ok = every($keys, function(key) {
                    return ~indexOf(actual, key);
                });
                if (!this.flags.not && this.flags.only) {
                    ok = ok && $keys.length == actual.length;
                }
                if (len > 1) {
                    $keys = map($keys, function(key) {
                        return i(key);
                    });
                    var last = $keys.pop();
                    str = $keys.join(", ") + ", and " + last;
                } else {
                    str = i($keys[0]);
                }
                str = (len > 1 ? "keys " : "key ") + str;
                str = (!this.flags.only ? "include " : "only have ") + str;
                this.assert(ok, function() {
                    return "expected " + i(this.obj) + " to " + str;
                }, function() {
                    return "expected " + i(this.obj) + " to not " + str;
                });
                return this;
            };
            Assertion.prototype.fail = function(msg) {
                msg = msg || "explicit failure";
                this.assert(false, msg, msg);
                return this;
            };
            function bind(fn, scope) {
                return function() {
                    return fn.apply(scope, arguments);
                };
            }
            function every(arr, fn, thisObj) {
                var scope = thisObj || global;
                for (var i = 0, j = arr.length; i < j; ++i) {
                    if (!fn.call(scope, arr[i], i, arr)) {
                        return false;
                    }
                }
                return true;
            }
            function indexOf(arr, o, i) {
                if (Array.prototype.indexOf) {
                    return Array.prototype.indexOf.call(arr, o, i);
                }
                if (arr.length === undefined) {
                    return -1;
                }
                for (var j = arr.length, i = i < 0 ? i + j < 0 ? 0 : i + j : i || 0; i < j && arr[i] !== o; i++) ;
                return j <= i ? -1 : i;
            }
            var getOuterHTML = function(element) {
                if ("outerHTML" in element) return element.outerHTML;
                var ns = "http://www.w3.org/1999/xhtml";
                var container = document.createElementNS(ns, "_");
                var elemProto = (window.HTMLElement || window.Element).prototype;
                var xmlSerializer = new XMLSerializer;
                var html;
                if (document.xmlVersion) {
                    return xmlSerializer.serializeToString(element);
                } else {
                    container.appendChild(element.cloneNode(false));
                    html = container.innerHTML.replace("><", ">" + element.innerHTML + "<");
                    container.innerHTML = "";
                    return html;
                }
            };
            var isDOMElement = function(object) {
                if (typeof HTMLElement === "object") {
                    return object instanceof HTMLElement;
                } else {
                    return object && typeof object === "object" && object.nodeType === 1 && typeof object.nodeName === "string";
                }
            };
            function i(obj, showHidden, depth) {
                var seen = [];
                function stylize(str) {
                    return str;
                }
                function format(value, recurseTimes) {
                    if (value && typeof value.inspect === "function" && value !== exports && !(value.constructor && value.constructor.prototype === value)) {
                        return value.inspect(recurseTimes);
                    }
                    switch (typeof value) {
                      case "undefined":
                        return stylize("undefined", "undefined");
                      case "string":
                        var simple = "'" + json.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
                        return stylize(simple, "string");
                      case "number":
                        return stylize("" + value, "number");
                      case "boolean":
                        return stylize("" + value, "boolean");
                    }
                    if (value === null) {
                        return stylize("null", "null");
                    }
                    if (isDOMElement(value)) {
                        return getOuterHTML(value);
                    }
                    var visible_keys = keys(value);
                    var $keys = showHidden ? Object.getOwnPropertyNames(value) : visible_keys;
                    if (typeof value === "function" && $keys.length === 0) {
                        if (isRegExp(value)) {
                            return stylize("" + value, "regexp");
                        } else {
                            var name = value.name ? ": " + value.name : "";
                            return stylize("[Function" + name + "]", "special");
                        }
                    }
                    if (isDate(value) && $keys.length === 0) {
                        return stylize(value.toUTCString(), "date");
                    }
                    var base, type, braces;
                    if (isArray(value)) {
                        type = "Array";
                        braces = [ "[", "]" ];
                    } else {
                        type = "Object";
                        braces = [ "{", "}" ];
                    }
                    if (typeof value === "function") {
                        var n = value.name ? ": " + value.name : "";
                        base = isRegExp(value) ? " " + value : " [Function" + n + "]";
                    } else {
                        base = "";
                    }
                    if (isDate(value)) {
                        base = " " + value.toUTCString();
                    }
                    if ($keys.length === 0) {
                        return braces[0] + base + braces[1];
                    }
                    if (recurseTimes < 0) {
                        if (isRegExp(value)) {
                            return stylize("" + value, "regexp");
                        } else {
                            return stylize("[Object]", "special");
                        }
                    }
                    seen.push(value);
                    var output = map($keys, function(key) {
                        var name, str;
                        if (value.__lookupGetter__) {
                            if (value.__lookupGetter__(key)) {
                                if (value.__lookupSetter__(key)) {
                                    str = stylize("[Getter/Setter]", "special");
                                } else {
                                    str = stylize("[Getter]", "special");
                                }
                            } else {
                                if (value.__lookupSetter__(key)) {
                                    str = stylize("[Setter]", "special");
                                }
                            }
                        }
                        if (indexOf(visible_keys, key) < 0) {
                            name = "[" + key + "]";
                        }
                        if (!str) {
                            if (indexOf(seen, value[key]) < 0) {
                                if (recurseTimes === null) {
                                    str = format(value[key]);
                                } else {
                                    str = format(value[key], recurseTimes - 1);
                                }
                                if (str.indexOf("\n") > -1) {
                                    if (isArray(value)) {
                                        str = map(str.split("\n"), function(line) {
                                            return "  " + line;
                                        }).join("\n").substr(2);
                                    } else {
                                        str = "\n" + map(str.split("\n"), function(line) {
                                            return "   " + line;
                                        }).join("\n");
                                    }
                                }
                            } else {
                                str = stylize("[Circular]", "special");
                            }
                        }
                        if (typeof name === "undefined") {
                            if (type === "Array" && key.match(/^\d+$/)) {
                                return str;
                            }
                            name = json.stringify("" + key);
                            if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
                                name = name.substr(1, name.length - 2);
                                name = stylize(name, "name");
                            } else {
                                name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
                                name = stylize(name, "string");
                            }
                        }
                        return name + ": " + str;
                    });
                    seen.pop();
                    var numLinesEst = 0;
                    var length = reduce(output, function(prev, cur) {
                        numLinesEst++;
                        if (indexOf(cur, "\n") >= 0) numLinesEst++;
                        return prev + cur.length + 1;
                    }, 0);
                    if (length > 50) {
                        output = braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
                    } else {
                        output = braces[0] + base + " " + output.join(", ") + " " + braces[1];
                    }
                    return output;
                }
                return format(obj, typeof depth === "undefined" ? 2 : depth);
            }
            function isArray(ar) {
                return Object.prototype.toString.call(ar) == "[object Array]";
            }
            function isRegExp(re) {
                var s;
                try {
                    s = "" + re;
                } catch (e) {
                    return false;
                }
                return re instanceof RegExp || typeof re === "function" && re.constructor.name === "RegExp" && re.compile && re.test && re.exec && s.match(/^\/.*\/[gim]{0,3}$/);
            }
            function isDate(d) {
                if (d instanceof Date) return true;
                return false;
            }
            function keys(obj) {
                if (Object.keys) {
                    return Object.keys(obj);
                }
                var keys = [];
                for (var i in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, i)) {
                        keys.push(i);
                    }
                }
                return keys;
            }
            function map(arr, mapper, that) {
                if (Array.prototype.map) {
                    return Array.prototype.map.call(arr, mapper, that);
                }
                var other = new Array(arr.length);
                for (var i = 0, n = arr.length; i < n; i++) if (i in arr) other[i] = mapper.call(that, arr[i], i, arr);
                return other;
            }
            function reduce(arr, fun) {
                if (Array.prototype.reduce) {
                    return Array.prototype.reduce.apply(arr, Array.prototype.slice.call(arguments, 1));
                }
                var len = +this.length;
                if (typeof fun !== "function") throw new TypeError;
                if (len === 0 && arguments.length === 1) throw new TypeError;
                var i = 0;
                if (arguments.length >= 2) {
                    var rv = arguments[1];
                } else {
                    do {
                        if (i in this) {
                            rv = this[i++];
                            break;
                        }
                        if (++i >= len) throw new TypeError;
                    } while (true);
                }
                for (; i < len; i++) {
                    if (i in this) rv = fun.call(null, rv, this[i], i, this);
                }
                return rv;
            }
            expect.eql = function eql(actual, expected) {
                if (actual === expected) {
                    return true;
                } else if ("undefined" != typeof Buffer && Buffer.isBuffer(actual) && Buffer.isBuffer(expected)) {
                    if (actual.length != expected.length) return false;
                    for (var i = 0; i < actual.length; i++) {
                        if (actual[i] !== expected[i]) return false;
                    }
                    return true;
                } else if (actual instanceof Date && expected instanceof Date) {
                    return actual.getTime() === expected.getTime();
                } else if (typeof actual != "object" && typeof expected != "object") {
                    return actual == expected;
                } else {
                    return objEquiv(actual, expected);
                }
            };
            function isUndefinedOrNull(value) {
                return value === null || value === undefined;
            }
            function isArguments(object) {
                return Object.prototype.toString.call(object) == "[object Arguments]";
            }
            function objEquiv(a, b) {
                if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) return false;
                if (a.prototype !== b.prototype) return false;
                if (isArguments(a)) {
                    if (!isArguments(b)) {
                        return false;
                    }
                    a = pSlice.call(a);
                    b = pSlice.call(b);
                    return expect.eql(a, b);
                }
                try {
                    var ka = keys(a), kb = keys(b), key, i;
                } catch (e) {
                    return false;
                }
                if (ka.length != kb.length) return false;
                ka.sort();
                kb.sort();
                for (i = ka.length - 1; i >= 0; i--) {
                    if (ka[i] != kb[i]) return false;
                }
                for (i = ka.length - 1; i >= 0; i--) {
                    key = ka[i];
                    if (!expect.eql(a[key], b[key])) return false;
                }
                return true;
            }
            var json = function() {
                "use strict";
                if ("object" == typeof JSON && JSON.parse && JSON.stringify) {
                    return {
                        parse: nativeJSON.parse,
                        stringify: nativeJSON.stringify
                    };
                }
                var JSON = {};
                function f(n) {
                    return n < 10 ? "0" + n : n;
                }
                function date(d, key) {
                    return isFinite(d.valueOf()) ? d.getUTCFullYear() + "-" + f(d.getUTCMonth() + 1) + "-" + f(d.getUTCDate()) + "T" + f(d.getUTCHours()) + ":" + f(d.getUTCMinutes()) + ":" + f(d.getUTCSeconds()) + "Z" : null;
                }
                var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
                    "\b": "\\b",
                    "	": "\\t",
                    "\n": "\\n",
                    "\f": "\\f",
                    "\r": "\\r",
                    '"': '\\"',
                    "\\": "\\\\"
                }, rep;
                function quote(string) {
                    escapable.lastIndex = 0;
                    return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
                        var c = meta[a];
                        return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                    }) + '"' : '"' + string + '"';
                }
                function str(key, holder) {
                    var i, k, v, length, mind = gap, partial, value = holder[key];
                    if (value instanceof Date) {
                        value = date(key);
                    }
                    if (typeof rep === "function") {
                        value = rep.call(holder, key, value);
                    }
                    switch (typeof value) {
                      case "string":
                        return quote(value);
                      case "number":
                        return isFinite(value) ? String(value) : "null";
                      case "boolean":
                      case "null":
                        return String(value);
                      case "object":
                        if (!value) {
                            return "null";
                        }
                        gap += indent;
                        partial = [];
                        if (Object.prototype.toString.apply(value) === "[object Array]") {
                            length = value.length;
                            for (i = 0; i < length; i += 1) {
                                partial[i] = str(i, value) || "null";
                            }
                            v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                            gap = mind;
                            return v;
                        }
                        if (rep && typeof rep === "object") {
                            length = rep.length;
                            for (i = 0; i < length; i += 1) {
                                if (typeof rep[i] === "string") {
                                    k = rep[i];
                                    v = str(k, value);
                                    if (v) {
                                        partial.push(quote(k) + (gap ? ": " : ":") + v);
                                    }
                                }
                            }
                        } else {
                            for (k in value) {
                                if (Object.prototype.hasOwnProperty.call(value, k)) {
                                    v = str(k, value);
                                    if (v) {
                                        partial.push(quote(k) + (gap ? ": " : ":") + v);
                                    }
                                }
                            }
                        }
                        v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
                        gap = mind;
                        return v;
                    }
                }
                JSON.stringify = function(value, replacer, space) {
                    var i;
                    gap = "";
                    indent = "";
                    if (typeof space === "number") {
                        for (i = 0; i < space; i += 1) {
                            indent += " ";
                        }
                    } else if (typeof space === "string") {
                        indent = space;
                    }
                    rep = replacer;
                    if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                        throw new Error("JSON.stringify");
                    }
                    return str("", {
                        "": value
                    });
                };
                JSON.parse = function(text, reviver) {
                    var j;
                    function walk(holder, key) {
                        var k, v, value = holder[key];
                        if (value && typeof value === "object") {
                            for (k in value) {
                                if (Object.prototype.hasOwnProperty.call(value, k)) {
                                    v = walk(value, k);
                                    if (v !== undefined) {
                                        value[k] = v;
                                    } else {
                                        delete value[k];
                                    }
                                }
                            }
                        }
                        return reviver.call(holder, key, value);
                    }
                    text = String(text);
                    cx.lastIndex = 0;
                    if (cx.test(text)) {
                        text = text.replace(cx, function(a) {
                            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                        });
                    }
                    if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                        j = eval("(" + text + ")");
                        return typeof reviver === "function" ? walk({
                            "": j
                        }, "") : j;
                    }
                    throw new SyntaxError("JSON.parse");
                };
                return JSON;
            }();
            if ("undefined" != typeof window) {
                window.expect = module.exports;
            }
        })(this, "undefined" != typeof module ? module : {}, "undefined" != typeof exports ? exports : {});
        return module.exports;
    });
    define("hoist/lib/transformer.js", function(require, module, exports, __dirname, __filename) {
        (function() {
            var async, getArrayTypeCaster, getClassTypeCaster, getSimpleDataTypeCaster, getTypeCaster, type;
            type = require("type-component/index.js");
            async = require("async/lib/async.js");
            getArrayTypeCaster = function() {
                return function(value) {
                    if (type(value) === "array") {
                        return value;
                    }
                    return [ value ];
                };
            };
            getSimpleDataTypeCaster = function(typeClass) {
                return function(value) {
                    return typeClass(value);
                };
            };
            getClassTypeCaster = function(typeClass) {
                return function(value) {
                    if (value && value.constructor === typeClass) {
                        return value;
                    }
                    return new typeClass(value);
                };
            };
            getTypeCaster = function(typeClass) {
                if (typeClass === Array) {
                    return getArrayTypeCaster();
                }
                if (typeClass === String || typeClass === Number) {
                    return getSimpleDataTypeCaster(typeClass);
                }
                return getClassTypeCaster(typeClass);
            };
            module.exports = function(options) {
                var caster, mapper, self, _mid, _post, _pre, _transform;
                if (options == null) {
                    options = {};
                }
                _transform = [];
                _pre = [];
                _post = [];
                _mid = [];
                self = function(value, next) {
                    if (arguments.length > 1 && type(arguments[arguments.length - 1]) === "function") {
                        return self.async(value, next);
                    } else {
                        return self.sync.apply(null, arguments);
                    }
                };
                self.async = function(value, next) {
                    return async.eachSeries(_transform, function(transformer, next) {
                        if (transformer.async) {
                            return transformer.transform(value, function(err, result) {
                                if (err) {
                                    return next(err);
                                }
                                return next(null, value = result);
                            });
                        } else {
                            value = transformer.transform(value);
                            return next();
                        }
                    }, function(err, result) {
                        if (err) {
                            return next(err);
                        }
                        return next(null, value);
                    });
                };
                self.sync = function() {
                    var transformer, _i, _len;
                    for (_i = 0, _len = _transform.length; _i < _len; _i++) {
                        transformer = _transform[_i];
                        arguments[0] = transformer.transform.apply(null, arguments);
                    }
                    return arguments[0];
                };
                self.preCast = function(typeClass) {
                    return self._push(caster(typeClass), _pre);
                };
                self.cast = function(typeClass) {
                    return self._push(caster(typeClass), _mid);
                };
                self.postCast = function(typeClass) {
                    return self._push(caster(typeClass), _post);
                };
                caster = function(typeClass) {
                    return {
                        transform: getTypeCaster(typeClass)
                    };
                };
                self.preMap = function(fn) {
                    return self._push(mapper(fn), _pre);
                };
                self.map = function(fn) {
                    return self._push(mapper(fn), _mid);
                };
                self.postMap = function(fn) {
                    return self._push(mapper(fn), _post);
                };
                mapper = function(fn) {
                    return {
                        async: fn.length > 1,
                        transform: fn
                    };
                };
                self._push = function(obj, stack) {
                    stack.push(obj);
                    _transform = _pre.concat(_mid).concat(_post);
                    return this;
                };
                return self;
            };
        }).call(this);
        return module.exports;
    });
    define("type-component/index.js", function(require, module, exports, __dirname, __filename) {
        var toString = Object.prototype.toString;
        module.exports = function(val) {
            switch (toString.call(val)) {
              case "[object Function]":
                return "function";
              case "[object Date]":
                return "date";
              case "[object RegExp]":
                return "regexp";
              case "[object Arguments]":
                return "arguments";
              case "[object Array]":
                return "array";
            }
            if (val === null) return "null";
            if (val === undefined) return "undefined";
            if (val === Object(val)) return "object";
            return typeof val;
        };
        return module.exports;
    });
    define("async/lib/async.js", function(require, module, exports, __dirname, __filename) {
        (function() {
            var async = {};
            var root, previous_async;
            root = this;
            if (root != null) {
                previous_async = root.async;
            }
            async.noConflict = function() {
                root.async = previous_async;
                return async;
            };
            function only_once(fn) {
                var called = false;
                return function() {
                    if (called) throw new Error("Callback was already called.");
                    called = true;
                    fn.apply(root, arguments);
                };
            }
            var _each = function(arr, iterator) {
                if (arr.forEach) {
                    return arr.forEach(iterator);
                }
                for (var i = 0; i < arr.length; i += 1) {
                    iterator(arr[i], i, arr);
                }
            };
            var _map = function(arr, iterator) {
                if (arr.map) {
                    return arr.map(iterator);
                }
                var results = [];
                _each(arr, function(x, i, a) {
                    results.push(iterator(x, i, a));
                });
                return results;
            };
            var _reduce = function(arr, iterator, memo) {
                if (arr.reduce) {
                    return arr.reduce(iterator, memo);
                }
                _each(arr, function(x, i, a) {
                    memo = iterator(memo, x, i, a);
                });
                return memo;
            };
            var _keys = function(obj) {
                if (Object.keys) {
                    return Object.keys(obj);
                }
                var keys = [];
                for (var k in obj) {
                    if (obj.hasOwnProperty(k)) {
                        keys.push(k);
                    }
                }
                return keys;
            };
            if (typeof process === "undefined" || !process.nextTick) {
                if (typeof setImmediate === "function") {
                    async.setImmediate = setImmediate;
                    async.nextTick = setImmediate;
                } else {
                    async.setImmediate = async.nextTick;
                    async.nextTick = function(fn) {
                        setTimeout(fn, 0);
                    };
                }
            } else {
                async.nextTick = process.nextTick;
                if (typeof setImmediate !== "undefined") {
                    async.setImmediate = setImmediate;
                } else {
                    async.setImmediate = async.nextTick;
                }
            }
            async.each = function(arr, iterator, callback) {
                callback = callback || function() {};
                if (!arr.length) {
                    return callback();
                }
                var completed = 0;
                _each(arr, function(x) {
                    iterator(x, only_once(function(err) {
                        if (err) {
                            callback(err);
                            callback = function() {};
                        } else {
                            completed += 1;
                            if (completed >= arr.length) {
                                callback(null);
                            }
                        }
                    }));
                });
            };
            async.forEach = async.each;
            async.eachSeries = function(arr, iterator, callback) {
                callback = callback || function() {};
                if (!arr.length) {
                    return callback();
                }
                var completed = 0;
                var iterate = function() {
                    iterator(arr[completed], function(err) {
                        if (err) {
                            callback(err);
                            callback = function() {};
                        } else {
                            completed += 1;
                            if (completed >= arr.length) {
                                callback(null);
                            } else {
                                iterate();
                            }
                        }
                    });
                };
                iterate();
            };
            async.forEachSeries = async.eachSeries;
            async.eachLimit = function(arr, limit, iterator, callback) {
                var fn = _eachLimit(limit);
                fn.apply(null, [ arr, iterator, callback ]);
            };
            async.forEachLimit = async.eachLimit;
            var _eachLimit = function(limit) {
                return function(arr, iterator, callback) {
                    callback = callback || function() {};
                    if (!arr.length || limit <= 0) {
                        return callback();
                    }
                    var completed = 0;
                    var started = 0;
                    var running = 0;
                    (function replenish() {
                        if (completed >= arr.length) {
                            return callback();
                        }
                        while (running < limit && started < arr.length) {
                            started += 1;
                            running += 1;
                            iterator(arr[started - 1], function(err) {
                                if (err) {
                                    callback(err);
                                    callback = function() {};
                                } else {
                                    completed += 1;
                                    running -= 1;
                                    if (completed >= arr.length) {
                                        callback();
                                    } else {
                                        replenish();
                                    }
                                }
                            });
                        }
                    })();
                };
            };
            var doParallel = function(fn) {
                return function() {
                    var args = Array.prototype.slice.call(arguments);
                    return fn.apply(null, [ async.each ].concat(args));
                };
            };
            var doParallelLimit = function(limit, fn) {
                return function() {
                    var args = Array.prototype.slice.call(arguments);
                    return fn.apply(null, [ _eachLimit(limit) ].concat(args));
                };
            };
            var doSeries = function(fn) {
                return function() {
                    var args = Array.prototype.slice.call(arguments);
                    return fn.apply(null, [ async.eachSeries ].concat(args));
                };
            };
            var _asyncMap = function(eachfn, arr, iterator, callback) {
                var results = [];
                arr = _map(arr, function(x, i) {
                    return {
                        index: i,
                        value: x
                    };
                });
                eachfn(arr, function(x, callback) {
                    iterator(x.value, function(err, v) {
                        results[x.index] = v;
                        callback(err);
                    });
                }, function(err) {
                    callback(err, results);
                });
            };
            async.map = doParallel(_asyncMap);
            async.mapSeries = doSeries(_asyncMap);
            async.mapLimit = function(arr, limit, iterator, callback) {
                return _mapLimit(limit)(arr, iterator, callback);
            };
            var _mapLimit = function(limit) {
                return doParallelLimit(limit, _asyncMap);
            };
            async.reduce = function(arr, memo, iterator, callback) {
                async.eachSeries(arr, function(x, callback) {
                    iterator(memo, x, function(err, v) {
                        memo = v;
                        callback(err);
                    });
                }, function(err) {
                    callback(err, memo);
                });
            };
            async.inject = async.reduce;
            async.foldl = async.reduce;
            async.reduceRight = function(arr, memo, iterator, callback) {
                var reversed = _map(arr, function(x) {
                    return x;
                }).reverse();
                async.reduce(reversed, memo, iterator, callback);
            };
            async.foldr = async.reduceRight;
            var _filter = function(eachfn, arr, iterator, callback) {
                var results = [];
                arr = _map(arr, function(x, i) {
                    return {
                        index: i,
                        value: x
                    };
                });
                eachfn(arr, function(x, callback) {
                    iterator(x.value, function(v) {
                        if (v) {
                            results.push(x);
                        }
                        callback();
                    });
                }, function(err) {
                    callback(_map(results.sort(function(a, b) {
                        return a.index - b.index;
                    }), function(x) {
                        return x.value;
                    }));
                });
            };
            async.filter = doParallel(_filter);
            async.filterSeries = doSeries(_filter);
            async.select = async.filter;
            async.selectSeries = async.filterSeries;
            var _reject = function(eachfn, arr, iterator, callback) {
                var results = [];
                arr = _map(arr, function(x, i) {
                    return {
                        index: i,
                        value: x
                    };
                });
                eachfn(arr, function(x, callback) {
                    iterator(x.value, function(v) {
                        if (!v) {
                            results.push(x);
                        }
                        callback();
                    });
                }, function(err) {
                    callback(_map(results.sort(function(a, b) {
                        return a.index - b.index;
                    }), function(x) {
                        return x.value;
                    }));
                });
            };
            async.reject = doParallel(_reject);
            async.rejectSeries = doSeries(_reject);
            var _detect = function(eachfn, arr, iterator, main_callback) {
                eachfn(arr, function(x, callback) {
                    iterator(x, function(result) {
                        if (result) {
                            main_callback(x);
                            main_callback = function() {};
                        } else {
                            callback();
                        }
                    });
                }, function(err) {
                    main_callback();
                });
            };
            async.detect = doParallel(_detect);
            async.detectSeries = doSeries(_detect);
            async.some = function(arr, iterator, main_callback) {
                async.each(arr, function(x, callback) {
                    iterator(x, function(v) {
                        if (v) {
                            main_callback(true);
                            main_callback = function() {};
                        }
                        callback();
                    });
                }, function(err) {
                    main_callback(false);
                });
            };
            async.any = async.some;
            async.every = function(arr, iterator, main_callback) {
                async.each(arr, function(x, callback) {
                    iterator(x, function(v) {
                        if (!v) {
                            main_callback(false);
                            main_callback = function() {};
                        }
                        callback();
                    });
                }, function(err) {
                    main_callback(true);
                });
            };
            async.all = async.every;
            async.sortBy = function(arr, iterator, callback) {
                async.map(arr, function(x, callback) {
                    iterator(x, function(err, criteria) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, {
                                value: x,
                                criteria: criteria
                            });
                        }
                    });
                }, function(err, results) {
                    if (err) {
                        return callback(err);
                    } else {
                        var fn = function(left, right) {
                            var a = left.criteria, b = right.criteria;
                            return a < b ? -1 : a > b ? 1 : 0;
                        };
                        callback(null, _map(results.sort(fn), function(x) {
                            return x.value;
                        }));
                    }
                });
            };
            async.auto = function(tasks, callback) {
                callback = callback || function() {};
                var keys = _keys(tasks);
                if (!keys.length) {
                    return callback(null);
                }
                var results = {};
                var listeners = [];
                var addListener = function(fn) {
                    listeners.unshift(fn);
                };
                var removeListener = function(fn) {
                    for (var i = 0; i < listeners.length; i += 1) {
                        if (listeners[i] === fn) {
                            listeners.splice(i, 1);
                            return;
                        }
                    }
                };
                var taskComplete = function() {
                    _each(listeners.slice(0), function(fn) {
                        fn();
                    });
                };
                addListener(function() {
                    if (_keys(results).length === keys.length) {
                        callback(null, results);
                        callback = function() {};
                    }
                });
                _each(keys, function(k) {
                    var task = tasks[k] instanceof Function ? [ tasks[k] ] : tasks[k];
                    var taskCallback = function(err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        if (err) {
                            var safeResults = {};
                            _each(_keys(results), function(rkey) {
                                safeResults[rkey] = results[rkey];
                            });
                            safeResults[k] = args;
                            callback(err, safeResults);
                            callback = function() {};
                        } else {
                            results[k] = args;
                            async.setImmediate(taskComplete);
                        }
                    };
                    var requires = task.slice(0, Math.abs(task.length - 1)) || [];
                    var ready = function() {
                        return _reduce(requires, function(a, x) {
                            return a && results.hasOwnProperty(x);
                        }, true) && !results.hasOwnProperty(k);
                    };
                    if (ready()) {
                        task[task.length - 1](taskCallback, results);
                    } else {
                        var listener = function() {
                            if (ready()) {
                                removeListener(listener);
                                task[task.length - 1](taskCallback, results);
                            }
                        };
                        addListener(listener);
                    }
                });
            };
            async.waterfall = function(tasks, callback) {
                callback = callback || function() {};
                if (tasks.constructor !== Array) {
                    var err = new Error("First argument to waterfall must be an array of functions");
                    return callback(err);
                }
                if (!tasks.length) {
                    return callback();
                }
                var wrapIterator = function(iterator) {
                    return function(err) {
                        if (err) {
                            callback.apply(null, arguments);
                            callback = function() {};
                        } else {
                            var args = Array.prototype.slice.call(arguments, 1);
                            var next = iterator.next();
                            if (next) {
                                args.push(wrapIterator(next));
                            } else {
                                args.push(callback);
                            }
                            async.setImmediate(function() {
                                iterator.apply(null, args);
                            });
                        }
                    };
                };
                wrapIterator(async.iterator(tasks))();
            };
            var _parallel = function(eachfn, tasks, callback) {
                callback = callback || function() {};
                if (tasks.constructor === Array) {
                    eachfn.map(tasks, function(fn, callback) {
                        if (fn) {
                            fn(function(err) {
                                var args = Array.prototype.slice.call(arguments, 1);
                                if (args.length <= 1) {
                                    args = args[0];
                                }
                                callback.call(null, err, args);
                            });
                        }
                    }, callback);
                } else {
                    var results = {};
                    eachfn.each(_keys(tasks), function(k, callback) {
                        tasks[k](function(err) {
                            var args = Array.prototype.slice.call(arguments, 1);
                            if (args.length <= 1) {
                                args = args[0];
                            }
                            results[k] = args;
                            callback(err);
                        });
                    }, function(err) {
                        callback(err, results);
                    });
                }
            };
            async.parallel = function(tasks, callback) {
                _parallel({
                    map: async.map,
                    each: async.each
                }, tasks, callback);
            };
            async.parallelLimit = function(tasks, limit, callback) {
                _parallel({
                    map: _mapLimit(limit),
                    each: _eachLimit(limit)
                }, tasks, callback);
            };
            async.series = function(tasks, callback) {
                callback = callback || function() {};
                if (tasks.constructor === Array) {
                    async.mapSeries(tasks, function(fn, callback) {
                        if (fn) {
                            fn(function(err) {
                                var args = Array.prototype.slice.call(arguments, 1);
                                if (args.length <= 1) {
                                    args = args[0];
                                }
                                callback.call(null, err, args);
                            });
                        }
                    }, callback);
                } else {
                    var results = {};
                    async.eachSeries(_keys(tasks), function(k, callback) {
                        tasks[k](function(err) {
                            var args = Array.prototype.slice.call(arguments, 1);
                            if (args.length <= 1) {
                                args = args[0];
                            }
                            results[k] = args;
                            callback(err);
                        });
                    }, function(err) {
                        callback(err, results);
                    });
                }
            };
            async.iterator = function(tasks) {
                var makeCallback = function(index) {
                    var fn = function() {
                        if (tasks.length) {
                            tasks[index].apply(null, arguments);
                        }
                        return fn.next();
                    };
                    fn.next = function() {
                        return index < tasks.length - 1 ? makeCallback(index + 1) : null;
                    };
                    return fn;
                };
                return makeCallback(0);
            };
            async.apply = function(fn) {
                var args = Array.prototype.slice.call(arguments, 1);
                return function() {
                    return fn.apply(null, args.concat(Array.prototype.slice.call(arguments)));
                };
            };
            var _concat = function(eachfn, arr, fn, callback) {
                var r = [];
                eachfn(arr, function(x, cb) {
                    fn(x, function(err, y) {
                        r = r.concat(y || []);
                        cb(err);
                    });
                }, function(err) {
                    callback(err, r);
                });
            };
            async.concat = doParallel(_concat);
            async.concatSeries = doSeries(_concat);
            async.whilst = function(test, iterator, callback) {
                if (test()) {
                    iterator(function(err) {
                        if (err) {
                            return callback(err);
                        }
                        async.whilst(test, iterator, callback);
                    });
                } else {
                    callback();
                }
            };
            async.doWhilst = function(iterator, test, callback) {
                iterator(function(err) {
                    if (err) {
                        return callback(err);
                    }
                    if (test()) {
                        async.doWhilst(iterator, test, callback);
                    } else {
                        callback();
                    }
                });
            };
            async.until = function(test, iterator, callback) {
                if (!test()) {
                    iterator(function(err) {
                        if (err) {
                            return callback(err);
                        }
                        async.until(test, iterator, callback);
                    });
                } else {
                    callback();
                }
            };
            async.doUntil = function(iterator, test, callback) {
                iterator(function(err) {
                    if (err) {
                        return callback(err);
                    }
                    if (!test()) {
                        async.doUntil(iterator, test, callback);
                    } else {
                        callback();
                    }
                });
            };
            async.queue = function(worker, concurrency) {
                if (concurrency === undefined) {
                    concurrency = 1;
                }
                function _insert(q, data, pos, callback) {
                    if (data.constructor !== Array) {
                        data = [ data ];
                    }
                    _each(data, function(task) {
                        var item = {
                            data: task,
                            callback: typeof callback === "function" ? callback : null
                        };
                        if (pos) {
                            q.tasks.unshift(item);
                        } else {
                            q.tasks.push(item);
                        }
                        if (q.saturated && q.tasks.length === concurrency) {
                            q.saturated();
                        }
                        async.setImmediate(q.process);
                    });
                }
                var workers = 0;
                var q = {
                    tasks: [],
                    concurrency: concurrency,
                    saturated: null,
                    empty: null,
                    drain: null,
                    push: function(data, callback) {
                        _insert(q, data, false, callback);
                    },
                    unshift: function(data, callback) {
                        _insert(q, data, true, callback);
                    },
                    process: function() {
                        if (workers < q.concurrency && q.tasks.length) {
                            var task = q.tasks.shift();
                            if (q.empty && q.tasks.length === 0) {
                                q.empty();
                            }
                            workers += 1;
                            var next = function() {
                                workers -= 1;
                                if (task.callback) {
                                    task.callback.apply(task, arguments);
                                }
                                if (q.drain && q.tasks.length + workers === 0) {
                                    q.drain();
                                }
                                q.process();
                            };
                            var cb = only_once(next);
                            worker(task.data, cb);
                        }
                    },
                    length: function() {
                        return q.tasks.length;
                    },
                    running: function() {
                        return workers;
                    }
                };
                return q;
            };
            async.cargo = function(worker, payload) {
                var working = false, tasks = [];
                var cargo = {
                    tasks: tasks,
                    payload: payload,
                    saturated: null,
                    empty: null,
                    drain: null,
                    push: function(data, callback) {
                        if (data.constructor !== Array) {
                            data = [ data ];
                        }
                        _each(data, function(task) {
                            tasks.push({
                                data: task,
                                callback: typeof callback === "function" ? callback : null
                            });
                            if (cargo.saturated && tasks.length === payload) {
                                cargo.saturated();
                            }
                        });
                        async.setImmediate(cargo.process);
                    },
                    process: function process() {
                        if (working) return;
                        if (tasks.length === 0) {
                            if (cargo.drain) cargo.drain();
                            return;
                        }
                        var ts = typeof payload === "number" ? tasks.splice(0, payload) : tasks.splice(0);
                        var ds = _map(ts, function(task) {
                            return task.data;
                        });
                        if (cargo.empty) cargo.empty();
                        working = true;
                        worker(ds, function() {
                            working = false;
                            var args = arguments;
                            _each(ts, function(data) {
                                if (data.callback) {
                                    data.callback.apply(null, args);
                                }
                            });
                            process();
                        });
                    },
                    length: function() {
                        return tasks.length;
                    },
                    running: function() {
                        return working;
                    }
                };
                return cargo;
            };
            var _console_fn = function(name) {
                return function(fn) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    fn.apply(null, args.concat([ function(err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (typeof console !== "undefined") {
                            if (err) {
                                if (console.error) {
                                    console.error(err);
                                }
                            } else if (console[name]) {
                                _each(args, function(x) {
                                    console[name](x);
                                });
                            }
                        }
                    } ]));
                };
            };
            async.log = _console_fn("log");
            async.dir = _console_fn("dir");
            async.memoize = function(fn, hasher) {
                var memo = {};
                var queues = {};
                hasher = hasher || function(x) {
                    return x;
                };
                var memoized = function() {
                    var args = Array.prototype.slice.call(arguments);
                    var callback = args.pop();
                    var key = hasher.apply(null, args);
                    if (key in memo) {
                        callback.apply(null, memo[key]);
                    } else if (key in queues) {
                        queues[key].push(callback);
                    } else {
                        queues[key] = [ callback ];
                        fn.apply(null, args.concat([ function() {
                            memo[key] = arguments;
                            var q = queues[key];
                            delete queues[key];
                            for (var i = 0, l = q.length; i < l; i++) {
                                q[i].apply(null, arguments);
                            }
                        } ]));
                    }
                };
                memoized.memo = memo;
                memoized.unmemoized = fn;
                return memoized;
            };
            async.unmemoize = function(fn) {
                return function() {
                    return (fn.unmemoized || fn).apply(null, arguments);
                };
            };
            async.times = function(count, iterator, callback) {
                var counter = [];
                for (var i = 0; i < count; i++) {
                    counter.push(i);
                }
                return async.map(counter, iterator, callback);
            };
            async.timesSeries = function(count, iterator, callback) {
                var counter = [];
                for (var i = 0; i < count; i++) {
                    counter.push(i);
                }
                return async.mapSeries(counter, iterator, callback);
            };
            async.compose = function() {
                var fns = Array.prototype.reverse.call(arguments);
                return function() {
                    var that = this;
                    var args = Array.prototype.slice.call(arguments);
                    var callback = args.pop();
                    async.reduce(fns, args, function(newargs, fn, cb) {
                        fn.apply(that, newargs.concat([ function() {
                            var err = arguments[0];
                            var nextargs = Array.prototype.slice.call(arguments, 1);
                            cb(err, nextargs);
                        } ]));
                    }, function(err, results) {
                        callback.apply(that, [ err ].concat(results));
                    });
                };
            };
            var _applyEach = function(eachfn, fns) {
                var go = function() {
                    var that = this;
                    var args = Array.prototype.slice.call(arguments);
                    var callback = args.pop();
                    return eachfn(fns, function(fn, cb) {
                        fn.apply(that, args.concat([ cb ]));
                    }, callback);
                };
                if (arguments.length > 2) {
                    var args = Array.prototype.slice.call(arguments, 2);
                    return go.apply(this, args);
                } else {
                    return go;
                }
            };
            async.applyEach = doParallel(_applyEach);
            async.applyEachSeries = doSeries(_applyEach);
            async.forever = function(fn, callback) {
                function next(err) {
                    if (err) {
                        if (callback) {
                            return callback(err);
                        }
                        throw err;
                    }
                    fn(next);
                }
                next();
            };
            if (typeof define !== "undefined" && define.amd) {
                define([], function() {
                    return async;
                });
            } else if (typeof module !== "undefined" && module.exports) {
                module.exports = async;
            } else {
                root.async = async;
            }
        })();
        return module.exports;
    });
    var entries = [ "hoist/test-web/async-test.js" ];
    for (var i = entries.length; i--; ) {
        _require(entries[i]);
    }
})();
path = require "path"
superagent = require "superagent"
comerr = require "comerr"
async = require "async"
detective = require "detective"
paperclip = require "paperclip"
parser = require "paperclip/lib/parser"

crypto = require('crypto')

exports.compile = (files, useCompiler, complete) ->

  if typeof useCompiler is "function"
    complete = useCompiler
    useCompiler = true

  addLocalDeps files

  addRemoteFiles files, (err) ->
    if err
      return complete err
    try 
      script = parse files
      if useCompiler
        fn = compile script
        
      complete null, fn, script
    catch e
      complete e


getFilesHash = (files) -> crypto.createHash('md5').update(JSON.stringify(files)).digest('hex')


addLocalDeps = (files) ->
  files.forEach (file) ->
    file.deps = detective file.content


scanRemoteDeps = (files) ->
  remoteDeps = []

cdn = "http://browserify-cdn.herokuapp.com"
#cdn = "http://wzrd.in"

_remoteModuleCache = {}

addRemoteFiles = (files, complete) ->
  remoteDeps = {}

  for file in files
    for dep in file.deps
      unless ~dep.indexOf("/")
        depParts = dep.split("@")
        name = depParts.shift()
        version = depParts.shift() || "latest"
        moduleName = name + (if version is "latest" then "" else "@" + version)

        if _remoteModuleCache[moduleName]
          files.push _remoteModuleCache[moduleName]
          continue

        remoteDeps[name] = version

  pkg = {
    "options": {
      "debug": true
    },
    "dependencies": remoteDeps
  }

  unless Object.keys(remoteDeps).length
    return complete()

  superagent.post(cdn + "/multi").send(pkg).end (err, response) ->

    if err
      return complete err

    unless response.body
      return complete new Error response.text

    for moduleName of response.body
      files.push remoteModule = {
        path: modulePath = if remoteDeps[moduleName] is "latest" then moduleName else moduleName + "@" + remoteDeps[moduleName],
        content: "module.exports = " + response.body[moduleName].bundle + "('"+moduleName+"')"
      }

      if process.browser
        _remoteModuleCache[modulePath] = remoteModule

    complete()


  async.each remoteDeps


exports.script = compile = (source) -> new Function("return " + source)()

parse = (files) ->

  buffer = "
    (function () {\n

    var defined = {},
    modules     = {};

    var _console = window.console,
    console  = {};

    ['log', 'error', 'warn', 'notice'].forEach(function (level) {
      console[level] = function () {
        window.console[level].apply(window.console, arguments);
      };
    });

    function define (path, createModule) {
      defined[path] = createModule;
    }

    function resolve (path) {
      if (defined[path]) return path;
      if (defined[path + '/index.js']) return path + '/index.js';
      if (defined[path + '.js']) return path + '.js';
    }

    function require (path) {
      var resolvedPath = resolve(path);
      if (!resolvedPath) {
        throw new Error('unable to resolve ' + path);
      }
      return modules[resolvedPath] || (modules[resolvedPath] = createModule(resolvedPath))
    }

    function createModule (path) {

      var module = {
        exports: {}
      };

      var pathParts = path.split('/'),
      dirname       = pathParts.slice(0, pathParts.length - 1).join('/');

      defined[path](module, module.exports, function (relpath) {
        return require(relpath.replace(/^\\./, dirname));
      });

      return module.exports;
    }
  "

  for file in files
    buffer += "\ndefine('"+file.path+"', function (module, exports, require) {"
    buffer += "\n" + transformContent(file) + "\n";
    buffer += "});"



  buffer += "return require('/index.js');";
  buffer += "\n})();"

  return buffer


transformContent = (file) ->

  if file.path is "/index.js"
    file.content = "exports.initialize = function (preview) {" +
      "preview.captureLogs(console);" +
      file.content +
    "};"




  if (ext = file.path.split(".").pop()) is "pc"
    return parser.parse file.content
  else if ext is "js" or !~file.path.indexOf(".") or ~file.path.indexOf("@")
    return file.content
  else
    return "module.exports = decodeURIComponent('" + encodeURIComponent(file.content) + "');"

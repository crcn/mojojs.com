views = require "mojo-views"
superagent = require "superagent"
compiler = require "./compiler"
bindableCall = require "bindable-call"

class IdeView extends views.Base
  bindings:
    "file.files.first": "currentFile"
    "currentFile": () -> @recompile()
    "compileRequest.loading": "loading"
    "compileRequest.result": "script"
    "compileRequest.error": "error"

  paper: require("./index.pc")
  children:
    header: require("./header")
    sidebar: require("./sidebar")
    body: require("./content")

  setCurrentFile: (file) ->
    @set "currentFile", file

  prepForRecompile: () ->
    @set "canRecompile", true

  recompile: () ->
    console.log "RECOMPILE"
    return unless process.browser
    @set "canRecompile", false
    @set "compileRequest", bindableCall (complete) =>
      compiler.compile _flattenFiles(@file), complete


  expand: () ->
    @set "expanded", not @get "expanded"

  collapse: () ->


_flattenFiles = (file, dirname = "", files = []) ->
  if file.get("files")
    file.get("files").each (subFile) -> _flattenFiles subFile, dirname + file.get("name"), files
  else
    files.push {
      path: dirname + file.get("name"),
      content: decodeURIComponent(file.get("content"))
    }

  files

module.exports = IdeView
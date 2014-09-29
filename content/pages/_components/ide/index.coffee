views = require "mojo-views"

class IdeView extends views.Base
  bindings:
    "file.files.first": "currentFile"
    "currentFile": () -> @recompile()
  paper: require("./index.pc")
  children:
    header: require("./header")
    sidebar: require("./sidebar")
    body: require("./content")

  setCurrentFile: (file) ->
    @set "currentFile", file

  recompile: () ->
    console.log "RECOMP"

  expand: () ->
    @set "expanded", not @get "expanded"

  collapse: () ->

module.exports = IdeView
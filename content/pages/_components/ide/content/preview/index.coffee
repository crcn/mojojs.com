views = require "mojo-views"
bindable = require "bindable"

class LogView extends views.Base
  paper: require("./log.pc")

class Preview extends views.Base

  ###
  ###

  paper: require("./index.pc")

  ###
  ###
  define: ["content"]

  ###
  ###

  bindings:
    "script": (script) ->
      unless script
        return

      @_runner?.dispose?()
      try
        @element = div = document.createElement "div"
        @_runner = script.initialize @
        @set "content", div
        console.log div
      catch e
        console.error e

  ###
  ###

  children:
    logs:
      type: "list"
      source: "logs"
      modelViewClass: LogView

  ###
  ###

  captureLogs: (_console) ->
    @set "logs", logs = new bindable.Collection()
    ["log", "error", "warn", "notice"].forEach (level) ->
      _console[level] = () ->
        if typeof text is "object"
          text = JSON.stringify text, null, 2
        logs.push new bindable.Object {
          level: level,
          text: Array.prototype.slice.call(arguments).join(" ")
        }




module.exports = Preview

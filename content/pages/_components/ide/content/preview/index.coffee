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

      @set "error", undefined

      @_runner?.dispose?()
      try
        @element = div = document.createElement "div"
        @element.setAttribute "class", "preview-content"
        @_runner = script.initialize @
        @set "content", div
      catch e
        console.error e
        @set "error", e

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
        logs.push new bindable.Object {
          level: level,
          text: Array.prototype.slice.call(arguments).map((v) ->
            if typeof v is "object"
              v = JSON.stringify v, null, 2
            return v
          ).join(" ")
        }




module.exports = Preview

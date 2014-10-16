async = require "async"

if process.browser  
  ace = require "brace"
  require("brace/mode/javascript")
  require("brace/mode/html")
  require("brace/theme/tomorrow_night")
  require("brace/theme/tomorrow")
else
  ace = 
    edit: (element) ->

_ = require "lodash"

getMode = (doc) ->
  fileType = doc.get("name").split(".")
  {
    pc: "html",
    js: "javascript"
  }[fileType] || "javascript"

views = require "mojo-views"

class EditorView extends views.Base.extend({

  paper: require("./index.pc")
  define: ["content"]

  bindings:
    "currentFile": (currentFile) ->
      src = currentFile.get("content")
      return unless @editor

      clearTimeout @_timeout

      @editor.getSession().setMode("ace/mode/" + getMode(currentFile))
      @editor.setValue src = decodeURIComponent src
      @editor.setValue(src, -1) 
      @editor.setValue(src, 1) 

      @$(".ide-editor").scrollTop(0)


  didCreateSection: () ->
    return unless process.browser
    div = document.createElement "div"
    @editor = ace.edit div
    @editor.setTheme("ace/theme/" + (this.get("theme") || "tomorrow"))
    @editor.getSession().setUseWorker(false)
    @editor.renderer.setShowGutter(false)
    @editor.getSession().setUseWrapMode(true)
    @editor.setOptions 
      maxLines: Infinity

    @set "content", div

    @editor.on "input", () =>
      @set "currentFile.content", encodeURIComponent @editor.getValue()
      @get("prepForRecompile")()

})

module.exports = EditorView 
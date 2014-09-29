if process.browser  
  ace = require "brace"
else
  ace = 
    edit: (element) ->

require("brace/mode/javascript")
require("brace/mode/html")
_ = require "lodash"

getMode = (doc) ->
  fileType = doc.get("name").split(".")
  {
    pc: "html",
    js: "javascript"
  }[fileType] || "javascript"

views = require "mojo-views"

class EditorView extends views.Base.extend({

  bindings:
    "currentFile": (currentFile) ->
      src = currentFile.get("content")
      @editor.getSession().setMode("ace/mode/" + getMode(currentFile))
      @editor.setValue decodeURIComponent src

  didCreateSection: () ->
    div = document.createElement "div"
    div.setAttribute "class", "ide-editor"
    @editor = ace.edit div
    @editor.getSession().setUseWorker(false)
    @editor.renderer.setShowGutter(false)
    @editor.setOptions 
      maxLines: 32
      minLines: 20

    @section.appendChild div

    @editor.on "input", () =>
      @set "currentFile.content", encodeURIComponent @editor.getValue()
      @get("recompile")()

})

module.exports = EditorView 
views = require "mojo-views"

class FileView extends views.Base
  paper: require("./file.pc")
  sections: 
    files:
      type: "list"
      source: "model.files"
      modelViewFactory: (options) -> new FileView options, @application

  toggleVisibility: () ->
    if @model.get("files")
      @set "isClosed", not @get "isClosed"
    else 
      @get("setCurrentFile")(@model)

class SidebarView extends views.Base
  paper: require("./index.pc")
  bindings:
    "file": "model"
  sections:
    file: FileView


module.exports = SidebarView
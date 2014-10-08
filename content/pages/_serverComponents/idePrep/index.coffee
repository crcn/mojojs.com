views = require "mojo-views"
glob = require "glob"
fs = require "fs"
bindable = require "bindable"
path = require "path"

class IdePrepView extends views.Base
  compile: true
  showPreview: true
  bindings:
    "sourceDir": (sourceDir) ->
      files = glob.sync sourceDir + "/**/*.*"

      readFiles = (parentPath, filePath, depth = 0) ->
        name =  filePath.replace(parentPath, "").replace(/^\//, "")
        if fs.lstatSync(filePath).isDirectory()
          return new bindable.Object {
            name: name.replace(/\:/g,"/") + "/",
            depth: depth
            files: new bindable.Collection fs.readdirSync(filePath).filter((name) -> name.substr(0, 1) isnt ".").map((name) -> readFiles filePath, path.join(filePath, name), depth + 1)
          }
        else
          return new bindable.Object {
            name: name.replace(/\:/g,"/").replace(/^\d+-/,""),
            depth: depth
            content: encodeURIComponent fs.readFileSync filePath, "utf8"
          }


      @set "files", readFiles(sourceDir, sourceDir + "/")

  paper: require("./index.pc")

module.exports = IdePrepView
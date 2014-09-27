

views = require "mojo-views"
glob = require "glob"
fs = require "fs"
path = require "path"
crypto = require "crypto"

types = {
  default: "text",
  js: "javascript",
  pc: "html",
  html: "html"
}

class DemoFilesView extends views.Base
  paper: require("./index.pc")
  bindings:
    "source": (source) ->
      @set "files", glob.sync(@source + "/**").filter((file) -> 
        not fs.lstatSync(file).isDirectory() && ~file.indexOf("demo")
      ).map (file) ->
        {
          _id: crypto.createHash('md5').update(file).digest('hex'),
          source: file,
          language: types[file.split(".").pop()] || types.default
          relpath: file.replace(source + "/", "").replace(/^\d+\-/,"").replace(".demo", ""),
          content: fs.readFileSync(file, "utf8")
        }
  sections:
    tabs: 
      type: "list"
      source: "files"
      modelViewClass: views.Base.extend
        paper: require("./tab.pc")
    files: 
      type: "list"
      source: "files"
      modelViewClass: views.Base.extend
        paper: require("./file.pc")


module.exports = DemoFilesView  
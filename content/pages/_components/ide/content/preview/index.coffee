views = require "mojo-views"

class Preview extends views.Base
  paper: require("./index.pc")
  bindings:
    "script": (script) ->
      unless script
        return
      try 
        div = document.createElement "div"          
        script.run div
        @set "content", div
        console.log div
      catch e
        console.error e


module.exports = Preview
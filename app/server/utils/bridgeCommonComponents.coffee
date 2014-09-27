
glob = require "glob"
fs = require "fs"
path = require "path"

module.exports = (app, name, type, serverOnly) ->
  
  buffer = ["module.exports = {"]
  modules = []

  componentDirectories = glob.sync(app.get("directories.content") + "/**/"+name+"/*")

  for component in componentDirectories
    componentName = path.basename(component).split(".").shift()
    if /^(index|_|\.)/.test(componentName)
      continue
    modules.push componentName + ": require('#{component}')"
    app[type].register componentName, require(component)

  buffer.push modules.join(","), "}"

  unless serverOnly
    fs.writeFile("/tmp/"+name+".coffee", buffer.join(""))
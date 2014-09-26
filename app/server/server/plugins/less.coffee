less = require "less"
glob = require "glob"
fs   = require "fs"
sortLessFiles = require "./sortLessFiles"
memoize = require "memoizee"
_ = require "lodash"

module.exports = (app) ->

  server = app.server


  cssParser = new less.Parser()

  getLessFiles = memoize ((next) ->
    lessFiles = glob.sync(__dirname + "/../../**/*.less").
      concat(glob.sync(__dirname + "/../../../common/**/*.less")).
      concat(glob.sync(__dirname + "/../../../browser/**/*.less")).
      concat(glob.sync(app.get("directories.content") + "/**/*.less"))

    next null, sortLessFiles(lessFiles).reverse()
  ), { async: true }

  genCss = memoize ((next) ->
    getLessFiles (err, lessFiles) ->
      buffer = []

      for path in lessFiles
        continue if fs.lstatSync(path).isDirectory()
        buffer.push fs.readFileSync(path, { encoding: "utf8" })

      cssParser.parse buffer.join("\n"), next

  ), { async: true }

  server.all "/css/app.css", (req, res) ->

    genCss (err, tree) ->

      if err 
        return res.send(JSON.stringify(err))

      res.setHeader("Content-Type", "text/css")
      res.send(tree.toCSS({
        compress: true
      }))


  if app.debug  
    watchFiles getLessFiles, () ->
      genCss.clear();


watchFiles = (load, run) ->
  run = _.debounce run, 500
  load (err, files) ->
    files.forEach (file) ->
      fs.watchFile file, { interval: 500 }, run




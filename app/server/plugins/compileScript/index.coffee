parseBody = require "body-parser"
scriptCompiler = require "../../../../utils/compileScript"
crypto = require "crypto"
fs = require "fs"
glob = require "glob"
uglify = require "uglify-js"
async = require "async"

module.exports = (app) ->

  prefix = "__script__"
  _i = Date.now()


  app.server.post "/api/compileScript", parseBody(), (req, res, next) ->

    hash = crypto.createHash('md5').update(JSON.stringify(req.body)).digest('hex')
    fp = "/tmp/" + prefix + hash + ".js"

    if fs.existsSync(fp)
      return fs.createReadStream(fp).pipe(res)

    scriptCompiler.compile req.body, false, (err, script, content) ->

      # TODO - proper error messae
      if err
        return next()

      ast = uglify.parse(content, {
        strict: false
      })

      ast.figure_out_scope()
      ast.compute_char_frequency()
      ast.mangle_names()

      content = ast.print_to_string({
        ascii_only: true,
        quote_keys: true
      })

      fs.writeFile fp, content
      res.send content



  clearCache = () ->

    async.eachSeries glob.sync("/tmp/" + prefix + "*"), (file, next) ->
      fs.unlink file, () -> next()

    prefix = "__script" + (_i++) + "__"


  # 1 day
  setInterval clearCache, 1000 * 60 * 60 * 24

  clearCache()
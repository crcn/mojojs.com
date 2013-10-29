
express = require "express"

exports.require = ["config"]
exports.load = (config) ->  
  server = express()
  server.listen(p = config.get("http.port"))
  console.log "HTTP server listening on port %d", p
  server

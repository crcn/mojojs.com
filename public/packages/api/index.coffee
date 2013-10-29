outcome = require "outcome"
stepc   = require "stepc"
vine    = require "vine"

exports.require = ["http.server", "npm.search"]
exports.load = (httpServer, npmSearch) ->

  ###

    /api/plugins/stats.json
    /api/plugins?q=search
  ###

  httpServer.get "/api/plugins.json", (req, res) ->

    # q=keywords:aba

    kw = (req.query.q || "").split("|").map (name) ->
      console.log name

    q = {
      keywords: {
        $in: kw
     }
    }

    console.log q, "d"

    o = outcome.e (err) -> res.send vine.error(err)

    stepc.async () ->
      npmSearch.search q, @
    , 
    o.s((items) ->
      console.log items
      res.send vine.result(items)
    )






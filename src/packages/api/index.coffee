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

    kw = new RegExp req.query.q

    q = {
      keywords: {$in: ["mojo-plugin"] },
      $or: [
        {
          keywords: kw
        },
        {
          name: kw
        }
      ]
    }

    console.log JSON.stringify q, null, 2

    o = outcome.e (err) -> res.send vine.error(err)

    stepc.async () ->
      npmSearch.search q, @
    , 
    o.s((items) ->
      res.send vine.result(items)
    )






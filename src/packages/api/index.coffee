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

    q     = req.query.q
    page  = Number(req.query.page   || 0)
    count = Number(req.query.count || 100)

    kw = new RegExp q

    q = {
      $or: [
        {
          keywords: kw
        },
        {
          name: kw
        }
      ]
    }

    o = outcome.e (err) -> res.send vine.error(err)

    stepc.async () ->
      npmSearch.search q, @
    , 
    o.s((items) ->
      start = page * count
      end   = start + count
      res.send vine.result(items.slice(start, end))
    )


  ###
  ###

  httpServer.get "/api/keywords.json", (req, res) ->

    page  = Number(req.query.page   || 0)
    count = Number(req.query.count || 100)

    npmSearch.keywords (err, keywords) ->
      start = page * count
      end   = start + count
      res.send vine.result(keywords.slice(start, end))







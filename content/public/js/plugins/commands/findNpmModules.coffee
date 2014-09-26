urlgrey = require("urlgrey")



module.exports = (message, next) ->



  url = urlgrey().
          path("/api/plugins.json").
          query({
            q     : message.data.keyword,
            page  : message.data.page  || 0,
            count : message.data.count || 40
          }).
          toString()

  console.log url

  $.getJSON(url).
    success((response) ->
      next undefined, response.result
    ).
    error(() ->
      next(new Error("unable to load plugins"))
    )
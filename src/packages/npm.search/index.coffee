flatstack = require "flatstack"
request   = require "request"
sift      = require "sift"
type      = require "type-component"
async     = require "async"

class NPMSearch
    
  ###
  ###

  constructor: () ->
    @_callstack = flatstack()
    @_modules  = []
    @_keywords = []
    @load()
    setInterval @load, 1000 * 60 * 10


  ###
  ###

  load: () =>
    console.log "loading mojo modules"
    req = request.get { url: "http://registry.npmjs.org/-/all", json: true }, (err, response, body) =>

      modules = []
      keywords = {}
      @_keywords = []

      for moduleName of body
        module = body[moduleName]
        continue unless typeof module is "object"

        modules.push body[moduleName]

      # only mojo plugins


      @_modules = modules.filter (module) -> 
        return false if not module.keywords or type(module.keywords) isnt "array"
        ~module.keywords.indexOf "mojo-plugin"

      @_modules.forEach (module) ->
        for keyword in module.keywords
          continue if keyword is "mojo-plugin"
          unless keywords[keywords] 
            keywords[keywords] = 0

          keywords[keywords]++

      for key of keywords
        @_keywords.push {
          name: key,
          count: keywords[key]
        }

      @_keywords = @_keywords.sort (a, b) ->
        return if a.count > b.count then -1 else 1

      console.log "loaded %d mojo modules", @_modules.length
      console.log "keywords", @_keywords.length

      @_loadGithubInfo()


  ###
  ###

  keywords: (next) ->
    next null, @_keywords


  ###
  ###

  search: (query, next) ->
    next null, sift(query)(@_modules || [])

  ###
  ###

  all: (next) =>
    @_callstack.push () =>
      next null, @_modules


  ###
  ###

  _loadGithubInfo: () ->
    async.eachSeries @_modules, ((module, next) ->
      return next() unless module.repository?.url
      urlParts = module.repository.url.match(/com\/([^\/]+)\/(.*)/)
      url = "https://api.github.com/repos/"+urlParts[1]+"/" + urlParts[2].replace(".git", "")

      headers = {
        "user-agent": "node.js"
      }
      request.get { url: url, json: true, headers: headers }, (err, response, body) =>
        module.forks = body.forks_count
        module.watchers = body.stargazers_count

        next()

    ), () ->


exports.load = () -> new NPMSearch()

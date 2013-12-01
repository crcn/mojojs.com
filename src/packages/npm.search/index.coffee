flatstack = require "flatstack"
request   = require "request"
sift      = require "sift"
type      = require "type-component"

class NPMSearch
    
  ###
  ###

  constructor: () ->
    @_callstack = flatstack()
    @_modules = []
    @load()
    setInterval @load, 1000 * 60 * 10


  ###
  ###

  load: () =>
    console.log "loading mojo modules"
    req = request.get { url: "http://registry.npmjs.org/-/all", json: true }, (err, response, body) =>

      modules = []

      for moduleName of body
        module = body[moduleName]
        continue unless typeof module is "object"

        modules.push body[moduleName]

      # only mojo plugins


      @_modules = modules.filter (module) -> 
        return false if not module.keywords or type(module.keywords) isnt "array"
        ~module.keywords.indexOf "mojo-plugin"

      console.log "loaded %d mojo modules", @_modules.length


  ###
  ###

  search: (query, next) ->
    next null, sift(query)(@_modules || [])

  ###
  ###

  all: (next) =>
    @_callstack.push () =>
      next null, @_modules


exports.load = () -> new NPMSearch()

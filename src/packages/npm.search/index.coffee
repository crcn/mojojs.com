flatstack = require "flatstack"
request   = require "request"
sift      = require "sift"

class NPMSearch
    
  ###
  ###

  constructor: () ->
    @_callstack = flatstack()
    #@load()
    #setInterval @load, 1000 * 60 * 10


  ###
  ###

  load: () =>
    @_callstack.push (next) =>
      console.log "loading Mojo modules"
      req = request.get { url: "http://registry.npmjs.org/-/all", json: true }, (err, response, body) ->

        modules = []

        for moduleName of body
          module = body[moduleName]
          continue unless typeof module is "object"

          modules.push body[moduleName]

        # only mojo plugins
        @_modules = modules.filter (module) -> 
          ~module.indexOf? "mojo-plugin"

        console.log "loaded %d mojo modules", @_modules

        next()


  ###
  ###

  search: (query, next) ->
    @_callstack.push () =>  
      next null, sift query, @_modules

  ###
  ###

  all: (next) =>
    @_callstack.push () =>
      next null, @_modules


exports.load = () -> new NPMSearch()

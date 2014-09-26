superagent = require "superagent"
_          = require "lodash"
mediocre   = require "mediocre"
traverse   = require "traverse"


###
error: [event] [data]
###

class Logger

  ###
  ###

  constructor: () ->
    @mediator = mediocre()


  ###
  ###

  use: (args...) ->
    for plugin in args
      plugin @

  ###
  ###

  log: (args...) ->
    @_log "log", args

  ###
  ###


  info: () ->
    @_log "info", [arguments...]


  ###
  ###


  track: () ->
    @_log "track", [arguments...]

  ###
  ###


  verbose: () ->
    @_log "verbose", [arguments...]

  ###
  ###

  warn: () ->
    @_log "warn", [arguments...]

  ###
  ###

  error: () ->
    @_log "error", [arguments...]

  ###
  ###

  _log: (status, args) ->


    method = console[status] ? console.log

    try
      nargs = JSON.parse(JSON.stringify([status].concat(args)))

      nargs = traverse(nargs).forEach (x) ->
        if @key is "password"
          @remove()
    catch e
      return

      
    return unless process.browser

    if typeof nargs[nargs.length - 1] isnt "object"
      nargs.push {}

    nargs.push {
      name: platform.name,
      version: platform.version,
      mobile: platform.mobile,
      os: {
        name: platform.os.family,
        version: platform.os.version
      }
    }


    @mediator.execute "newLog", nargs


    # IE 8 issues... (CC)
    try 
      method.apply(console, args)
    catch e


logger = new Logger()

if process.browser
  logger.use require "./track"
  logger.use require "./loggly"

global.logger = logger
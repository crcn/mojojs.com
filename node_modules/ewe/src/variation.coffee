class Variation
  
  ###
  ###

  constructor: (options, @test, @group) ->
    @weight  = options.weight
    @value   = options.value
    @control = options.control


  ###
  ###

  start: () ->
    @startTime = Date.now()
    @stopTime  = undefined
    @

  ###
  ###

  stop: () ->
    @stopTime = Date.now()
    @

  ###
  ###

  toJSON: () ->

    result = 
      startTime : @startTime
      weight    : @weight
      value     : @value

    if @stopTime?
      result.duration = @stopTime - @startTime
      result.stopTime = @stopTime

    result


module.exports = Variation

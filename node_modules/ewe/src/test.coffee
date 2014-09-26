Variation = require "./variation"
utils     = require "./utils"

class Test

  ###
  ###

  constructor: (@name, @group) ->
    @ewe = group.ewe
    @_variants = []

  ###
   selects a variant
  ###

  select: () ->

    # pick the random index based on the seed string
    variantIndex = utils.getRandomIndex @group.key + @name, @weights()

    # fetch the variant
    variant = @_variants[variantIndex]

    variant

  ###
   returns the weights of the variants
  ###

  weights: () ->
    weights = []
    for variant in @_variants
      weights.push Math.max variant.weight or 1, 1
    weights


  ###
   sets the control variant
  ###

  control: (name, options, value) ->
    return @_control unless arguments.length

    if arguments.length is 2
      value = options
      options = {}

    options.control = true

    @variant name, options, value
    @_control = @_variants[@_variants.length - 1]
    @


  ###
   creates a new variation
  ###

  variant: (name, options, value) ->

    if arguments.length is 2
      value = options
      options = {}


    options.value = value
    options.name  = name

    @_variants.push new Variation options, @, @group

    @

  ###
  ###

  start: () ->
    @ewe.service.start @_selected = @select().start()
    @_selected


  ###
  ###

  complete: () ->
    return unless @_selected
    @ewe.service.complete @_selected.stop()


module.exports = Test

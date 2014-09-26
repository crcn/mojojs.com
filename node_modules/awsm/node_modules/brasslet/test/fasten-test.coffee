fasten = require ".."
expect = require "expect.js"

describe "fasten", () ->
    
  it "can create a simple chain", (next) ->
    count = 0
    ops = {}

    server = 
      start: (next) ->
        ops.start = ++count
        next()
      stop: (next) ->
        ops.stop = ++count
        next()

    s = fasten().add("server", {
      start: 
        map: () -> @
      stop:
        map: () -> @
    }).wrap("server", server)

    s.start().stop().then () ->
      expect(ops.start).to.be(1)
      expect(ops.stop).to.be(2)
      next()

  it "can reference other object", (next) ->
    ops = {}
    count = 0

    image = 
      clone: (next) -> 
        ops.clone = ++count
        next null, image

    server = 
      createImage: (next) -> 
        ops.createImage = ++count
        next null, image

    s = fasten().
    add("server", {
      createImage: 
        type: "image"
        map: (image) -> image
    }).
    add("image", {
      clone: 
        type: "image"
        map: (image) -> image
    }).
    wrap("server", server)


    s.createImage().clone().then () ->
      expect(ops.createImage).to.be(1)
      expect(ops.clone).to.be(2)
      next()

  it "can call methods on an array of targets", (next) ->

    create = () ->
      makeSome: (count, next) ->
        items = []
        for i in [0...count]
          items.push create()
        next null, items

    s = fasten().
    add("sumtin", {
      makeSome: 
        type: "sumtin"
        map: (sumtin) -> sumtin
    }).
    wrap("sumtin", create())

    r = s.makeSome(3).makeSome(6).then (err, targets) ->
      expect(targets.length).to.be(18)
      next()


  it "can call end if there's an error", (next) ->
    s = fasten().
    add("sumtin", {
      sendError: 
        call: (next) -> next new Error("fail")
    })


    s.wrap("sumtin", {}).sendError().then((err) ->
      expect(err).not.to.be(undefined)
      next()
    )





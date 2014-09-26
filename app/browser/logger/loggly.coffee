
module.exports = (logger) ->


  
  logger.mediator.on "post newLog", (message, next) ->

    data = message.data

    _LTracker.push {
      location: String(window.location),
      status: data.shift(),
      text: data.shift(),
      body: data.shift(),
      platform: data.shift()
    }


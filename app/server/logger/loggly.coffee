loggly = require 'loggly'
 

module.exports = (logger) ->
  
  client = loggly.createClient {
  }

  logger.mediator.on "post newLog", (message, next) ->

    data = message.data

    log = {
      status: data.shift(),
      text: data.shift(),
      body: data.shift()
    }

    client.log log

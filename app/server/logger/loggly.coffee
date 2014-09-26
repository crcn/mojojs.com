loggly = require 'loggly'
 

module.exports = (logger) ->
  
  client = loggly.createClient {
    token: "d5e5ba9d-6535-4b1c-8245-dede8ef4a2a6",
    subdomain: "classdojo",
    tags: ["NodeJS"],
    json:true
  }

  logger.mediator.on "post newLog", (message, next) ->

    data = message.data

    log = {
      status: data.shift(),
      text: data.shift(),
      body: data.shift()
    }

    client.log log

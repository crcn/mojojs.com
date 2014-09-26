_ = require "lodash"
sa = require "superagent"

module.exports = (logger) ->

  batch = []
  
  logger.mediator.on "post newLog", (message, next) ->

    data = message.data.concat()

    batch.push {
      createdAt: new Date()
      status: data.shift(),
      text: data.shift(),
      body: data.shift(),
      platform: data.shift()
    }
    next()

    persist()


  persist = () ->

    body = batch.map((log) ->


      #log.createdAt + 
      log.status + 
      ": " + log.text + 
      (if log.body then ": " + JSON.stringify(log.body) else "")

    ).join("\n")

    sa.
    post("/api/clientLog").
    set("Content-Type", "text/plain").
    set("X-Application", "teach-mojette").
    send(body).
    end (e,r) ->

    batch = []


  persist = _.throttle(persist, 1000)
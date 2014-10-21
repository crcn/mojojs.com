parseBody = require "body-parser"
xss       = require "xss"

module.exports = (app) ->

  _id = 1
  
  messages = [
    { _id: String(_id++), text: "Welcome! This is a simple chatroom example.", createdAt: Date.now(), displayName: "Craig" },
    { _id: String(_id++), text: "Try editing, or adding a comment!", createdAt: Date.now(), displayName: "Craig" }
  ]

  sanitizeText = (text) -> String(xss(text)).substr(0, 100)

  app.server.get "/api/chatroom/messages", (req, res) ->
    res.send(messages)

  app.server.get "/api/chatroom/messages/:message", (req, res) ->
    res.send(messages.filter((message) -> message._id is req.params.message).pop())


  app.server.del "/api/chatroom/messages/:message", (req, res, next) ->
    for message, i in messages
      if message._id is req.params.message
        messages.splice(i, 1)
        return res.send message

    next()


  app.server.put "/api/chatroom/messages/:message", parseBody(), (req, res) ->
    message = messages.filter((message) -> message._id is req.params.message).pop()

    unless message
      return res.send(null)

    if req.body.text
      message.text = sanitizeText(req.body.text)

    res.send(message)

  app.server.post "/api/chatroom/messages", parseBody(), (req, res) ->

    # limit the number of messages
    if messages.length > 10
      messages.shift()

    messages.push ret = {
      _id: String(_id++),
      displayName: sanitizeText(req.body.displayName || "Anon"),
      text: sanitizeText(req.body.text),
      createdAt: new Date()
    }

    res.send ret
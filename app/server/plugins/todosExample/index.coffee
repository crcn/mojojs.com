parseBody = require "body-parser"
xss       = require "xss"

module.exports = (app) ->
  
  todos = []
  _id = 1

  sanitizeText = (text) -> String(xss(text)).substr(0, 100)

  app.server.get "/api/todos", (req, res) ->
    res.send(todos)

  app.server.get "/api/todos/:todo.json", (req, res) ->
    res.send(todos.filter((todo) -> todo._id is req.params.todo).pop())


  app.server.get "/api/todos/:todo.json", (req, res) ->
    todo = todos.filter((todo) -> todo._id is req.params.todo).pop()

    unless todo
      return res.send(null)

    if req.body.text
      todo.text = sanitizeText(req.body.text)

    res.send(todo)

  app.server.post "/api/todos", parseBody(), (req, res) ->

    # limit the number of todos
    if todos.length > 10
      todos.shift()

    todos.push ret = {
      _id: _id++,
      text: sanitizeText(req.body.text),
      createdAt: new Date()
    }

    res.send ret
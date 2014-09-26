toarray      = require "toarray"

commands = [
  require("./popup")
]

module.exports = (app) ->

  cmds = commands

  for command in cmds
    for name of command
      app.mediator.on name, toarray(command[name])...

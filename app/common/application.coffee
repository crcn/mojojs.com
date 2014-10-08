Application = require "mojo-application"

class ClassDojoApplication extends Application

  ###
  ###

  debug: process.env.NODE_ENV is "debug"

  ###
  ###

  browser: process.browser

  ###
  ###

  plugins: [
    require("mojo-views"),
    require("mojo-paperclip"),
    require("mojo-mediator"),
    require("mojo-bootstrap"),
    require("mojo-models"),
    # require("./plugins/errortracking"),

    require("./layouts"),
    require("./template"),
    require("./models")
  ]


module.exports = ClassDojoApplication

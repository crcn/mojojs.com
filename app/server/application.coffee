ClassDojoApplication = require "../common/application"
require "./logger"

###
###

class ClassDojoServerApplication extends ClassDojoApplication

  ###
  ###

  plugins: [
    require("mojo-router"),
    require("./server"),
    require("./routes"),
    require("./models"),
    require("./views"),
    require("./mongodb"),
    require("./plugins/docs"),
    require("./plugins/todosExample"),
    require("./plugins/chatroomExample"),
    require("./plugins/compileScript")
  ]


module.exports = ClassDojoServerApplication
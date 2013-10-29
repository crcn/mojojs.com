mojo = require "mojojs"

class MainView extends mojo.View
  paper: require("./index.pc")
  search: (keyword) ->
    console.log keyword

module.exports = MainView
mojo = require "mojojs"

class PagesView extends mojo.View
  paper: require("./index.pc")
  sections:
    pages:  
      type: "states"
      index: 0
      views: [
        { class: require("./home") } 
      ]

module.exports = PagesView
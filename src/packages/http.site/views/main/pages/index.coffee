mojo = require "mojojs"

class PagesView extends mojo.View
  paper: require("./index.pc")

  bindings:
    "routes.pages": "sections.pages.currentName"

  sections:
    pages:  
      type: "states"
      views: [
        { class: require("./home"), name: "home" },
        { class: require("./plugins"), name: "plugins" },
        { class: require("./docs"), name: "docs" }
      ]

module.exports = PagesView
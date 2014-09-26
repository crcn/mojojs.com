mojo = require("mojojs")
_ = require "underscore"

mojo.mediator = require("mediocre")()


$(document).scroll _.debounce (() ->
  mojo.models.set "scrollBottom", $(window).height() + $(document).scrollTop() == $(document.body).innerHeight()
), 100

require("./commands")


PluginsView = require "./views/main"
view = new PluginsView()

view.attach $ "#plugins"

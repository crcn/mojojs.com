mojo         = require "mojojs"
bindableCall = require "bindable-call"
MojoModules  = require "../../models/mojoModules"


class ModuleView extends mojo.View
  paper: require("./module.pc")

class MainView extends mojo.View

  ###
  ###

  define: ["findNpmModulesRequest", "loading", "modules"]

  ###
  ###

  bindings: 
    "findNpmModulesRequest.loading": "loading"
    "models.scrollBottom": (v) ->
      return unless v
      @loadMore()

  ###
  ###

  paper: require("./index.pc")

  ###
  ###

  _onRender: () ->
    super()
    @set "modules", new MojoModules()

  ###
  ###

  search: (keyword) ->
    @set "findNpmModulesRequest", bindableCall (next) => 
      @modules.search(keyword, next)


  ###
  ###

  loadMore: () ->
    @set "findNpmModulesRequest", bindableCall (next) => 
      @modules.loadMore(next)

  ###
  ###

  sections:
    modules:
      type           : "list"
      source         : "modules"
      modelViewClass : ModuleView

module.exports = MainView
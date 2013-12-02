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
    @set "keyword", keyword
    clearTimeout @_searchTimeout
    @_searchTimeout = setTimeout(@_debounceSearch, 200)


  ###
  ###

  _debounceSearch: (keyword) =>
    @set "findNpmModulesRequest", bindableCall (next) => 
      @modules.search(@get("keyword"), next)



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
      sort: (a, b) ->
        return if a.get("model.watchers") > b.get("model.watchers") then -1 else 1

module.exports = MainView
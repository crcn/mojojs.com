model = require "mojo-model"
mojo = require "mojojs"


class MojoModule extends model.Model


class MojoModules extends model.Collection

  ###
  ###

  constructor: (options) ->
    super()
    @set {
      page: 0,
      count: 50
    }

  ###
  ###

  createModel: (data) -> new MojoModule(data)

  ###
  ###

  search: (keyword, next) ->
    @set "kweyword", keyword
    @reload next

  ###
  ###

  next: (next = () ->) ->
    @set "page", @get("page")++
    @reload next


  ###
  ###

  _load: (next) ->
    mojo.mediator.execute "findNpmModules", {
      page    : @get("page"),
      count   : @get("count"),
      keyword : @get("keyword")
    }, next

module.exports = MojoModules

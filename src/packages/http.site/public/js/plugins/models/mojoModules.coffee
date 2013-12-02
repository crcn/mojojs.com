model = require "mojo-model"
mojo = require "mojojs"


class MojoModule extends model.Model
  map: (item) ->
    item._id = item.name
    item.author = item.author || item.maintainers?[0]
    item.watchers = item.watchers || 0
    item.forks = item.forks || 0
    return item


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

  createModel: (data) => 
    new MojoModule(data)

  ###
  ###

  search: (keyword, next) ->
    @set "keyword", keyword
    @_reset = true
    @reload next

  ###
  ###

  loadMore: (next = () ->) ->
    @set "page", @get("page") + 1
    @reload next


  ###
  ###

  _load: (next) ->

    @set "pageLength", undefined

    mojo.mediator.execute "findNpmModules", {
      page    : @get("page"),
      count   : @get("count"),
      keyword : @get("keyword")
    }, (err, items) =>
      return next(err) if err?

      if @_reset
        @_reset = false
        @reset items
      else
        @push items.map(@createModel)...

      @set "pageLength", items.length

      next()

module.exports = MojoModules

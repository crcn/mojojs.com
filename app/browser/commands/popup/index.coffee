PopupView = require "./views/popup"

module.exports =

  popup: (message, next) ->
    message.data.view.set "application", app = message.mediator.application

    $element = if app.mainView then app.mainView.$(".popups") else $(document.body)

    $element.append message.data.view.render()

    return unless message.data.scroll

    scrollTop = () -> $("html, body").animate({ scrollTop: 0 })

    if message.data.scrollTop isnt false
      message.data.view.once "remove", scrollTop
      scrollTop()

  modal: (message, next) ->

    console.log message.data.scroll

    view = new PopupView {
      scroll: message.data.scroll,
      extraCss : message.data.extraCss
      bgClickable: message.data.bgClickable ? true
      redButton: message.data.redButton or false
    }

    v = message.data?.view

    if typeof v is "string"
      v = message.mediator.application.views.create v, message.data

    if v
      v.set "name", "content"
      v.set "parent", view

      v.once "remove", () ->
        view.dispose()



    message.mediator.execute "popup", {
      view: view,
      scroll: message.data.scroll,
      scrollTop: message.data.scrollTop
    }, next

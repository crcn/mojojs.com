pc = require "paperclip"

module.exports = (app) ->

  modifiers =

    ###
    ###

    "moment": (date, format) ->
      return "Never" if not date
      m = moment(date)
      if format
        m = m.format format
      m

    ###
    ###

    "t": (text, params = {}) ->

      return text unless app.i18n

      @disposable @__context.bind "lang", () =>
        @update()

      app.i18n.t text, params, @__context.get "lang"


    ###
    ###

    isEnglish: (lang) ->
      return /^en/.test String(lang)

    ###
    ###

    insertLocale: (pathname, locale) ->
      pn = String(pathname).replace(/^\/\w{2}-\w{2}/, "") .replace(/\/+$/, "")

      if locale is "en-US"
        return if pn is "" then "/" else pn
      "/" + locale + pn


  for name of modifiers
    app.paperclip.modifier name, modifiers[name]

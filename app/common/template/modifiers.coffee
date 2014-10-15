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

    "round": Math.round


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

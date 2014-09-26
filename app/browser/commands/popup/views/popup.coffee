views = require "mojo-views"

class PopupView extends views.Base
  paper: require("./popup.pc")
  inModal: true
  bgClickable: true
  events:
    "closePopup": () -> @remove()

  didRender: () ->
    @application.animate {
      update: () =>
        @$(".fade").addClass "in"
    }

module.exports = PopupView

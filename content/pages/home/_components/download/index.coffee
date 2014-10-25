views = require "mojo-views"
ChooseFlavorModal = require "./modals/chooseFlavor"

class DownloadView extends views.Base
  paper: require "./index.pc"
  didRender2: () ->
    document.body.appendChild new ChooseFlavorModal({
      parent: @
    }, @application).render()


module.exports = DownloadView
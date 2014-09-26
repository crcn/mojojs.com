pc       = require("paperclip")
bindable = require("bindable")


loadClipboard = () ->
  loadClipboard = () ->
  ZeroClipboard.config {
    swfPath: "/vendor/zeroclipboard/ZeroClipboard.swf",
    forceHandCursor: true
  }

  ZeroClipboard.create()

class ClipboardDataBinding extends pc.BaseAttrDataBinding

  ###
  ###

  _onChange: (options) ->
    return unless process.browser
    return unless options.text
    loadClipboard()
    @clipboard?.destroy()
    $(this.node).attr("data-clipboard-text", options.text)

    clipboard = @clipboard = new ZeroClipboard this.node, {
      forceHandCursor: true
    }


    clipboard.on "ready", () ->
      console.log "ready"
      clipboard.on "copy", (client, args) =>
        if options.onCopied
          options.onCopied()

        if options.copied
          options.copied.value?(true)

    clipboard.on "error", (event) ->
      console.log event
      clipboard.destroy()



module.exports = ClipboardDataBinding

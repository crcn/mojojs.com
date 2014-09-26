pc = require "paperclip"

bustId = Date.now()

class CacheBusterPollyfill extends pc.BaseAttrBinding
  type: "attr"
  _onChange: (src) ->
    super src

    return unless src

    if (rel = @node.getAttribute("rel")) and rel is "alternate"
      return


    return if @node.nodeName is "A"

    return if ~src.indexOf(bustId)

    buff = if ~src.indexOf("?") then "&" else "?"

    @node.setAttribute @name, src + buff + bustId
    

module.exports = CacheBusterPollyfill
pc = require "paperclip"

class TrackElementBinding extends pc.BaseAttrBinding
  type: "attr"
  _onChange: (value) ->
    super value

    @_unwatch()

    # click:something got clicked!
    # seen:something was seen!
    v = value
    vp = v.split(":")
    @_name = vp.pop()
    @_event = vp.pop() or "seen"

    if @_event is "seen"
      return @_onEvent()
    else
      @node.addEventListener? @_event, @_onEvent, true

  unbind: () ->
    super arguments...
    @_unwatch()

  _unwatch: () ->
    if @_event and @_event isnt "seen"
      @node.removeEventListener? @_event, @_onEvent

  _onEvent: () =>
    # Turn off to save money.  When we turn back on,
    # we should use a whitelist.  
    #  mixpanel?.track @_event+":"+@_name
    logger?.track @_event+":"+@_name



module.exports = TrackElementBinding

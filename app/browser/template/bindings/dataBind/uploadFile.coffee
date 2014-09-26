pc       = require("paperclip")
bindable = require("bindable")
Url      = require "url"

class UploadFileDataBinding extends pc.BaseAttrDataBinding

  ###
  ###

  bind: () ->
    super arguments...


  ###
  ###

  _onChange: (options) ->
    return unless process.browser

    @onUpload = options.onUpload ? () ->

    @progress   = options.progress
    @error      = options.error
    @attachment = options.attachment

    return if @__initialized
    @__initialized = true

    $(this.node).attr("action", "#")

    $(this.node).transloadit({
      wait: true,
      triggerUploadOnFileSelection: true,
      autoSubmit: false,
      modal: false,

      onStart: () =>
        @error?.value? undefined
        @progress?.value? undefined
        @attachment?.value? undefined

      onProgress: (bytesReceived, bytesExpected) =>
        @progress?.value? Math.floor bytesReceived / bytesExpected * 100

      onError: (e) =>
        @error?.value? e
        @progress?.value? undefined

      onResult: (type, data) =>

        tracker.track "teacher_added_photo"

        @progress?.value? undefined

        return unless type is ":original"

        @onUpload att = {
          url: data.ssl_url,
          path: Url.parse(data.ssl_url).pathname.substr(1),
          name: data.name,
          size: data.size,
          type: if data.type is "image" then "photo" else "file",
          contentType: data.mime
        }

        @attachment?.value? att
      params: {
        auth: { key: "a6e2fe37faca47efa9a8f0f9c3c1a44d" },
        steps: {
          files: {
            robot: "/file/filter",
            error_on_decline: true
          },
          thumb: {
            robot: "/image/resize",
            format: "png"
          }
        },
        template_id: options.templateId || "bcdfda60184311e48c523f48f47bf7a1"
      }
    });



module.exports = UploadFileDataBinding

path = require "path"
superagent = require "superagent"
comerr = require "comerr"
async = require "async"
detective = require "detective"
paperclip = require "paperclip"
require "paperclip/lib/parser"

_compiler = require "../../../../../utils/compileScript"

crypto = require('crypto')

parser = window?.paperclip.template.compiler


exports.compile = (cache, files, complete) ->
  
  if false
    compileServerSide files, (err, content) ->

      if content
        return complete null, _compiler.script content

      _compiler.compile files, complete 
  else
    _compiler.compile files, complete



compileServerSide = (files, complete) ->
  superagent.post("/api/compileScript").send(files).end (err, response) ->
    if err
      return complete err



    unless /^20/.test String response.status
      return complete comerr.fromCode response.status

    return complete null, response.text
pc = require "paperclip"
bindable = require "bindable"

_id = 0

class BrowserifyBlockBinding extends pc.BaseBlockBinding

  ###
  ###

  _onChange: (value) ->

    scriptId = "script#{_id++}"
    script = @application.nodeFactory.createElement "script"
    script.setAttribute "type", "text/javascript"
    script.setAttribute "id", scriptId
    content = @application.nodeFactory.createTextNode ""

    content.nodeValue = "
      app.animate({
        update: function() {
          var view = app.views.create('#{value.component}', #{scriptifyObject(value)});
          var script = document.getElementById('#{scriptId}');
          var parent = script.parentNode;

          parent.insertBefore(view.render(), script);

          var sib = script;

          while(sib) {
            var nextSibling = sib.nextSibling;
            parent.removeChild(sib);
            if ($(sib).attr('data-section') === 'end') break;
            sib = nextSibling;
          }
        }
      });
    "
    script.appendChild(content)

    @section.replaceChildNodes script

    @section.append (@_view = @context.application.views.create(value.component, value)).render()
    s1 = @context.application.nodeFactory.createElement "span"
    s1.setAttribute("style", "display:none");
    s1.setAttribute("data-section", "end")
    @section.append s1

  ###
  ###

  unbind: () ->
    @_view.dispose()
    super arguments...




scriptifyObject = (options) ->

  if options.__isBindable
    return scriptifyBindableObject options

  nk = {}

  ibuffer = []

  for key of options
    v = options[key]

    if typeof v is "string"
      v = "'" + v.replace(/'/g,"\\'").replace(/\n/g, "\\n") + "'"

    if typeof v is "object"
      v = scriptifyObject v

    ibuffer.push("'"+key+"'"+":"+v)




  "{" + ibuffer.join(",") + "}"


scriptifyBindableObject = (bo) ->
  if bo.__isBindableCollection
    return "app.models.create('"+(bo.__name || "collection")+"', {_source: [" + bo.source().map(scriptifyObject).join(",") + "] })"
  else
    return "app.models.create('"+(bo.__name || "object")+"', "+scriptifyObject(props(bo))+")"


props = (vo) ->
  p = {}
  if vo.__context isnt vo
    vo = vo.__context
    
  for k of vo
    v = vo[k]
    if /string|number|object/.test typeof v
      p[k] = v

  if p.__isBindable
    delete p.__isBindable

  p




module.exports = BrowserifyBlockBinding

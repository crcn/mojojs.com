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

          var sibs = [];

          while(sib) {
            sibs.push(sib);
            var prevSibling = sib.prevSibling;
            if ($(sib).attr('data-section') === 'end') break;
            sib = prevSibling;
          }

          for (var i = sibs.length; i--;) {
            parent.removeChild(sibs[i]);
          }
        }
      });
    "
    script.appendChild(content)

    @section.append (@_view = @context.application.views.create(value.component, value)).render()
    s1 = @context.application.nodeFactory.createElement "span"
    s1.setAttribute("style", "display:none");
    s1.setAttribute("data-section", "end")


    @section.replaceChildNodes s1
    @section.append script

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
    return "app.models.create('"+(bo.__name || "collection")+"', {source: [" + bo.map(scriptifyObject).join(",") + "] })"
  else
    return "app.models.create('"+(bo.__name || "object")+"', "+scriptifyObject(props(bo))+")"


props = (vo) ->
  p = {}



  for k of vo?.toJSON() ? vo
    v = vo[k]
    if /string|number|object/.test typeof v
      p[k] = v


    if k.substr(0,2) is "__"
     delete p[k]

  p




module.exports = BrowserifyBlockBinding

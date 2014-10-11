{{
  properties: {
    category: "core api"
  }
}}

This base class is incredibly useful if you're looking to extend the functionality of DOM elements. This comes
handy especially when creating pollyfills for browsers that don't support certain DOM features, such as `placeholder`.

#### paperclip.nodeBinding(name, nodeBindingClass)

Registers a node name or attribute binding class

#### BaseAttrBinding(options)

{{#example}}
{{#block:"index-pc"}}
<!--
<input type="text" class="form-control" placeholder="message" data-bind="{{ model: <~>text }}"></input>
<span data-text="{{text}}"></span>
-->
{{/}}
{{#block:"textAttrBinding-js"}}
<!--
var paperclip = require("paperclip"),
views         = require("mojo-views");

module.exports = paperclip.BaseAttrBinding.extend({
  _onChange: function (text) {
    this.node.innerHTML = text || "";
  }
});
-->
{{/}}
{{#block:"index-js"}}
<!--
var bindable = require("bindable"),
Application  = require("mojo-application"),
views        = require("mojo-views"),
paperclip    = require("mojo-paperclip")

var app = new Application();
app.use(views, paperclip);

app.paperclip.nodeBinding("data-text", require("./textAttrBinding"));

preview.element.appendChild(new views.Base({
  paper: require("./index.pc")
}, app).render());

-->
{{/}}
{{/}}


#### override _onChange(text)

called whenever the attribute changes

#### node

the DOM node being bound to

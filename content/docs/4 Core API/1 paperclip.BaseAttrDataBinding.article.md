{{
  properties: {
    category: "core api"
  }
}}

#### paperclip.attrDataBinding(name, attrDataBindingClass)

Registers a attr data binding class for the `data-bind` attribute.

#### BaseAttrDataBinding(options)

Base class to extend when creating custom attr data binding.

{{#example}}
{{#block:"index-pc"}}
<!--
<input type="text" class="form-control" placeholder="message" data-bind="{{ model: <~>text }}"></input>
<span data-bind="{{ text: text }}"></span>
-->
{{/}}
{{#block:"textAttrDataBinding-js"}}
<!--
var paperclip = require("paperclip"),
views         = require("mojo-views");

module.exports = paperclip.BaseAttrDataBinding.extend({
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

app.paperclip.attrDataBinding("text", require("./textAttrDataBinding"));

preview.element.appendChild(new views.Base({
  paper: require("./index.pc")
}, app).render());

-->
{{/}}
{{/}}

#### node

the DOM node we're binding to

#### clip

the data binding script defined in the template

#### application

the application

#### scriptName

the script name registered to the binding class

#### script

the script defined within the clip

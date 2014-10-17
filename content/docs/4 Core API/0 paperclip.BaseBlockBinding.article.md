{{
  properties: {
    category: "core api"
  }
}}


#### paperclip.blockBinding(name, blockBindingClass)

Registers a new block binding class. Block bindings allow you to modify how templates behave. Some examples
include the `&#123;&#123;#if:condition&#125;&#125;&#123;&#123;/&#125;&#125;`, and `&#123;&#123;html:content&#125;&#125;`.

#### BaseBlockBinding(options)

Base class to extend when creating custom block bindings. Here's an example for an `&#123;&#123;#each:source&#125;&#125;&#123;&#123;/&#125;&#125;` binding:

{{#example}}
{{#block:"index-pc"}}
<!--
<ul>
  {{#each:items}}
    <li>{{model.text}}</li>
  {{/}}
</ul>
-->
{{/}}
{{#block:"eachBlockBinding-js"}}
<!--
var paperclip = require("paperclip"),
views         = require("mojo-views");

module.exports = paperclip.BaseBlockBinding.extend({
  bind: function (context) {

    var ItemView = views.Base.extend({
      paper: this.contentTemplate.paper
    });

    this._view = new views.List({
      modelViewClass: ItemView,
      parent: context
    });

    this.section.append(this._view.render());

    return paperclip.BaseBlockBinding.prototype.bind.call(this, context);
  },
  _onChange: function (properties) {

    if (!properties || properties.__isBindableCollection || !properties.source) {
      properties = {
        source: properties || []
      }
    }

    this._view.setProperties(properties);
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

app.paperclip.blockBinding("each", require("./eachBlockBinding"));

preview.element.appendChild(new views.Base({
  paper: require("./index.pc"),
  items: [
    { text: "item 1" },
    { text: "item 2" },
    { text: "item 3" }
  ]
}, app).render());
-->
{{/}}
{{/}}

#### override bind(context)

Called when the block is added, and bound to the DOM. This is where you initialize your binding.
Be sure to call `paperclip.BaseBlockBinding.prototype.bind.call(this, context)` if you override.
this method

#### override unbind()

Called when the block is removed from the DOM. This is a cleanup method.

#### override _onChange(context)

Called whenever the properties change for the block binding. These properties are defined in the
template. Here's the syntax:

```html
{{blockName: blockProperties }}
```

#### nodeFactory

the [node factory](https://github.com/mojo-js/nofactor.js) for creating elements. Use this to
make your block binding compatible with the NodeJS and the browser.

#### application

the application

#### clip

the data binding

#### scriptName

the name registered for the block binding

#### section

the section which contains all the elements

#### contentTemplate

the content template - this might be undefined if your block binding doesn't have `&#123;&#123;#block:properties&#125;&#125;content&#123;&#123;/&#125;&#125;`.

#### childBlockTemplate

The child block template. Used in the [conditional block](https://github.com/mojo-js/paperclip.js/blob/master/lib/paper/bindings/block/conditional.js).



<!--
TODO - Extended API
- router API
- each binding
-->

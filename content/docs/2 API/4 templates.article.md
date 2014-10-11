{{
  properties: {
    category: "api"
  }
}}


Templates Provide the *view* in *MVC* - they're simply used to display information to the user, and relay user-interactions back to the [view controller](/docs/apiviewsbase).


Paperclip takes on a mustache / handlebars approach with variables, blocks, and pollyfills. Paperclip also allows basic inline javascript, similar to angular.js.

<!--
TODO - template API's here
-->

<!--

this stuff should be somewhere else

Templates should be encapsulated. The only thing that should interact with templates is the view controller, so theoretically, you should have a functional application that
runs without the view, or information displayed to the user. This makes Unit Tests, and TDD much easier, and more effective.

Paperclip works by listening to the view controller, and updates the template if anything changes. Paperclip first translates HTML directly to JavaScript. At the same time, the parser also marks any data-bindings that it runs into. Paperclip then creates an element from the template, and then runs the browser's native `cloneNode()` method each time
the template is needed. Here's an example `hello` template:

```html
hello {{name}}!
```

is translated to:


```javascript
module.exports = function(fragment, block, element, text, textBlock, parser, modifiers) {
    return fragment([ text("hello "), block({
        value: {
            fn: function() {
                return this.get([ "name" ]);
            },
            refs: [ [ "name" ] ]
        }
    }, void 0), text("! ") ]);
};
```

Notice `refs` in the data-binding. This effectively tells paperclip exactly which DOM elements to data-bind to. Once an element is created, paperclip keeps track of
each data-binding, so there's no use of innerHTML, or any other operations that might re-create the element. This means you can use additional third-party libraries such as
`jQuery` without worrying that any attached behavior might be removed after a user interaction.

-->

## Template Syntax

#### &#123;&#123; blocks &#125;&#125;

Variable blocks as placeholders for information that might change. For example:


{{#example}}
{{#block:"index-pc"}}
<!--
hello {{ name.first }} {{ name.last }}!
-->
{{/}}
{{#block:"index-js"}}
<!--
var bindable = require("bindable"),
paperclip    = require("paperclip")();

var context = new bindable.Object({
  name: {
    first: "Morgan",
    last: "Freeman"
  }
});

var template = paperclip.template(require("./index.pc"));

preview.element.appendChild(template.bind(context).render());
-->
{{/}}
{{/}}

You can also specify blocks within attributes.

{{#example}}
{{#block:"index-pc"}}
<!--
my favorite color is <span style="color: {{color}}">{{color}}</span>
-->
{{/}}
{{#block:"index-js"}}
<!--
var bindable = require("bindable"),
paperclip    = require("paperclip")();

var context = new bindable.Object({
  color: "blue"
});

var template = paperclip.template(require("./index.pc"));

preview.element.appendChild(template.bind(context).render());
-->
{{/}}
{{/}}

Paperclip also supports **inline javascript**. For example:

{{#example}}
{{#block:"index-pc"}}
<!--
hello {{ message || "World" }}! <br />
inline-json {{ {'5+10 is':5+10, 'message is defined?' : message ? 'yes' : 'no' } | json }}
-->
{{/}}
{{#block:"index-js"}}
<!--
var bindable = require("bindable"),
paperclip    = require("paperclip")();

var context = new bindable.Object({
});

var template = paperclip.template(require("./index.pc"));

preview.element.appendChild(template.bind(context).render());
-->
{{/}}
{{/}}

### Modifiers

Modifiers format data in a variable block. A good example of this might be presenting data to the user depending on their locale, or parsing data into markdown. Here are a few examples of how you can use
modifiers:


{{#example}}
{{#block:"index-pc"}}
<!--

Converting content to markdown:

{{ html: content | markdown }}

Uppercasing & converting to markdown:

{{ html: content | uppercase | markdown }}

Modifiers with parameters:

A human that is {{age}} years old is like a {{ age | divide(5.6) }} year old dog!
-->
{{/}}
{{#block:"index-js"}}
<!--
var marked = require("marked"),
bindable   = require("bindable"),
paperclip  = require("paperclip")();

paperclip.modifier("markdown", function(value) {
  return marked(value || "");
});

paperclip.modifier("divide", function(value, num) {
  return Math.round((value || 0) / num);
});

var context = new mojo.Object({
  content: "This is some **awesome** markdown!",
  age: 65
});

var template = paperclip.template(require("./index.pc"));

preview.element.appendChild(template.bind(context).render());
-->
{{/}}
{{/}}


### Binding Operators

Paperclip comes with various binding operators that give you full control over how references are handled. You can easily
specify whether to bind one way, two ways, or not at all. Here's the basic syntax:

{{#example}}
{{#block:"index-pc"}}
<!--

Two-way binding:
<input class="form-control" data-bind="{{ model: <~>fullName }}" />

Bind input value to fullName only:
<input class="form-control" data-bind="{{ model: ~>fullName }}" />

Bind fullName to input value only:

<input class="form-control" data-bind="{{ model: <~fullName }}" />

Unbound helper - don't watch for any changes:
{{ ~fullName }}
-->
{{/}}
{{#block:"index-js"}}
<!--
var bindable = require("bindable"),
paperclip    = require("paperclip@0.5.7")();

var context = new bindable.Object({
  fullName: "John Smith"
});
var template = paperclip.template(require("./index.pc"));
preview.element.appendChild(template.bind(context).render());
-->
{{/}}
{{/}}

<!--
Note that that `~fullName` tells paperclip not to watch the reference, so any changes to `fullName` don't get reflected in the view.

Binding helpers are especially useful for [paperclip components](https://github.com/mojo-js/paperclip-component). Say for instance you have a date picker:

```
{{
    datePicker: {
      currentDate: <~>currentDate
    }
}}
```

The above example will apply a two-way data-binding to the `datePicker.currentDate` property and the `currentDate` property of the view controller.

-->

### Built-in components

#### &#123;&#123; html: content &#125;&#125;

Similar to escaping content in mustache (`&#123;&#123;&#123;content&#125;&#125;&#125;`). Good for security.

{{#example}}
{{#block:"index-pc"}}
<!--
Unsafe:
{{ html: content }} <br />

Safe:
{{ content }} <br />
-->
{{/}}
{{#block:"index-js"}}
<!--
var bindable = require("bindable"),
paperclip    = require("paperclip@0.5.8")();

var context = new bindable.Object({
  content: "Hello, I'm <strong>HTML</strong>!"
});
var template = paperclip.template(require("./index.pc"));
preview.element.appendChild(template.bind(context).render());
-->
{{/}}
{{/}}

#### &#123;&#123; #if: condition &#125;&#125;

Conditional block helper

{{#example}}
{{#block:"index-pc"}}
<!--
<input type="text" class="form-control" placeholder="What's your age?" data-bind="{{ model: <~>age }}"></input>
{{#if: age >= 18 }}
  You're legally able to vote in the U.S.
{{/elseif: age > 16 }}
  You're almost old enough to vote in the U.S.
{{/else}}
  You're too young to vote in the U.S.
{{/}}

-->
{{/}}
{{#block:"index-js"}}
<!--
var bindable = require("bindable"),
paperclip    = require("paperclip@0.5.8")();
var template = paperclip.template(require("./index.pc"));
preview.element.appendChild(template.bind().render());
-->
{{/}}
{{/}}

### data-bind attributes

data-bind attributes are inspired by [knockout.js](http://knockoutjs.com/). This is useful if you want to attach behavior to any DOM element.


#### &#123;&#123; model: context &#125;&#125;

Input data-binding

{{#example}}
{{#block:"index-pc"}}
<!--
<input type="text" class="form-control" placeholder="Type in a message" data-bind="{{ model: <~>message }}"></input>
<h3>{{message}}</h3>
-->
{{/}}
{{#block:"index-js"}}
<!--
var bindable = require("bindable"),
paperclip    = require("paperclip@0.5.8")();
var template = paperclip.template(require("./index.pc"));
preview.element.appendChild(template.bind().render());
-->
{{/}}
{{/}}

Notice the `<~>` operator. This tells paperclip to bind both ways. See [binding operators](#binding-operators) for more info.

#### &#123;&#123; event: expression &#125;&#125;

Executed when an event is fired on the DOM element. Here are all the available events:

- `onChange` - called when an element changes
- `onClick` - called when an element is clicked
- `onLoad` - called when an element loads - useful for `&lt;img /&gt;`
- `onSubmit` - called on submit - useful for `&lt;form /&gt;`
- `onMouseDown` - called on mouse down
- `onMouseUp` - called on mouse up
- `onMouseOver` - called on mouse over
- `onMouseOut` - called on mouse out
- `onKeyDown` - called on key down
- `onKeyUp` - called on key up
- `onEnter` - called on enter key up
- `onDelete` - called on delete key up


{{#example}}
{{#block:"index-pc"}}
<!--
<input type="text" class="form-control" placeholder="Type in a message" data-bind="{{ onEnter: enterPressed = true, focus: true }}"></input>

{{#if: enterPressed }}
  enter pressed
{{/}}
-->
{{/}}
{{#block:"index-js"}}
<!--
var bindable = require("bindable"),
paperclip    = require("paperclip@0.5.8")();
var template = paperclip.template(require("./index.pc"));
preview.element.appendChild(template.bind().render());
-->
{{/}}
{{/}}


#### &#123;&#123; show: bool &#125;&#125;

Toggles the display mode of a given element. This is similar to the ` &#123;&#123;#if: expression &#125;&#125;` conditional helper.


#### &#123;&#123; css: styles &#125;&#125;

Sets the css of a given element. [For example](http://jsfiddle.net/JTxdM/81/):

{{#example}}
{{#block:"index-pc"}}
<!--
how hot is it (fahrenheit)?: <input type="text" class="form-control" data-bind="{{ model: <~>temp }}"></input> <br />

<style type="text/css">
.cool { color: blue;   }
.warm { color: yellow; }
.hot  { color: red;    }
</style>

<strong data-bind="{{
  css: {
    cool    : temp > 0 || !temp,
    warm    : temp > 60,
    hot     : temp > 90
  }
}}">
  {{
    temp > 60 ?
    temp > 90 ? "it's hot" : "it's warm" :
    "it's cool"
  }}
</strong>

-->
{{/}}
{{#block:"index-js"}}
<!--
var bindable = require("bindable"),
paperclip    = require("paperclip@0.5.8")(),
context = new bindable.Object({
  temp: 70
});
var template = paperclip.template(require("./index.pc"));
preview.element.appendChild(template.bind(context).render());
-->
{{/}}
{{/}}

#### &#123;&#123; style: styles &#125;&#125;

Sets the style of a given element.

{{#example}}
{{#block:"index-pc"}}
<!--
color: <input type="text" data-bind="{{ model: <~>color }}" class="form-control"></input> <br />
size: <input type="text" data-bind="{{ model: <~>size }}" class="form-control"></input> <br />
<span data-bind="{{
  style: {
    color       : color,
    'font-size' : size
  }
}}">Hello World</span>
-->
{{/}}
{{#block:"index-js"}}
<!--
var bindable = require("bindable"),
paperclip    = require("paperclip@0.5.8")(),
context = new bindable.Object({
  temp: 70
});
var template = paperclip.template(require("./index.pc"));
preview.element.appendChild(template.bind(context).render());
-->
{{/}}
{{/}}

#### &#123;&#123; disable: bool &#125;&#125;

Toggles the enabled state of an element.

```html
<button data-bind={{ disable: !formIsValid }}>Sign Up</button>
```

#### &#123;&#123; focus: bool &#125;&#125;

Focuses cursor on an element.

```html
<input data-bind={{ focus: true }}></input>
```

### Basic API


#### paperclip([application])

initializes paperclip with the given application. `Application.main` will be used if this is omitted.

#### paperclip.modifier(modifierName, modifier)

registers a new paperclip modifier within the context of the application. See example above.

#### template paperclip.template(source)

Parses a template.

#### renderer template.bind(context)

Binds a template, and returns the template renderer.

#### DocumentFragment renderer.render()

Renders the template, and returns a data-bound document fragment.

#### renderer.remove()

removes the template elements

### Extending Paperclip

#### blockBinding(name, blockBindingClass)

Registers a new block binding class. Block bindings allow you to modify how templates behave. Some examples
include the `&#123;&#123;#if:condition&#125;&#125;&#123;&#123;/&#125;&#125;`, and `&#123;&#123;html:content&#125;&#125;`.

#### BaseBlockBinding

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

    if (!properties || !properties.source) {
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

#### override BaseBlockBinding.bind(context)

Called when the block is added, and bound to the DOM. This is where you initialize your binding.
Be sure to call `paperclip.BaseBlockBinding.prototype.bind.call(this, context)` if you override.
this method

#### override BaseBlockBinding.unbind()

Called when the block is removed from the DOM. This is a cleanup method.

#### override BaseBlockBinding._onChange(context)

Called whenever the properties change for the block binding. These properties are defined in the
template. Here's the syntax:

```html
{{blockName: blockProperties }}
```

#### BaseBlockBinding.nodeFactory

the [node factory](https://github.com/mojo-js/nofactor.js) for creating elements. Use this to
make your block binding compatible with the NodeJS and the browser.

#### BaseBlockBinding.application

the application

#### BaseBlockBinding.clip

the data binding

#### BaseBlockBinding.scriptName

the name registered for the block binding

#### BaseBlockBinding.section

the section which contains all the elements

#### BaseBlockBinding.contentTemplate

the content template - this might be undefined if your block binding doesn't have `&#123;&#123;#block:properties&#125;&#125;content&#123;&#123;/&#125;&#125;`.

#### BaseBlockBinding.childBlockTemplate

The child block template.  Used in the [conditional block](https://github.com/mojo-js/paperclip.js/blob/master/lib/paper/bindings/block/conditional.js).

#### nodeBinding(name, nodeBindingClass)

Registers a new node binding

#### attrDataBinding(name, attrDataBindingClass)

Registers an attribute binding


<!--
TODO - Extended API
- router API
- each binding
-->

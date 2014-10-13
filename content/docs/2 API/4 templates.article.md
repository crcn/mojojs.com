{{
  properties: {
    category: "api"
  }
}}

See Also [bindable.Object](/docs/api/bindableobject), [views.Base](/docs/api/viewsbase) <br />

Templates Provide the *view* in *MVC* - they're simply used to display information to the user, and relay user-interactions back to the [view controller](/docs/api/viewsbase).


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

### Installation

```
npm install mojo-paperclip --save-exact
```

{{#example}}
{{#block:"index-js"}}
<!--
var Application = require("mojo-application");
var MyApplication = Application.extend({
  plugins: [
    require("mojo-views"),
    require("mojo-paperclip")
  ]
});
var app = new MyApplication();
console.log("successfuly registered paperclip as a plugin");
-->
{{/}}
{{/}}



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

#### template.bind(context).render()

Binds a template, and returns a document fragment.

**For core paperclip documentation, see [Core API](/docs/core-api)**

<!--
extended API - router docs
-->

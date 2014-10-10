{{
  properties: {
    category: "api"
  }
}}

Paperclip is the preferred template engine for Mojo.js. However, any other template system can be used with the framework, including htmlbars, mustache, jade, and even angularjs.

Templates Provide the *view* in *MVC* - they're simply used to display information to the user, and relay user-interactions back to the main application.

Templates should be encapsulated. The only thing that should interact with templates is the view controller, so theoretically, you should have a functional application that
runs without the view, or information displayed to the user. This makes Unit Tests, and TDD much easier, and more effective.

Paperclip works by listening to the view controller, and updating the template if anything changes. Paperclip first translates HTML directly to JavaScript. At the same time, the parser also marks any data-bindings that it runs into. Paperclip then creates an element from the template, and then runs the browser's native `cloneNode()` method each time
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

### Examples

- [hello input](http://jsfiddle.net/JTxdM/67/)
- [hello world](http://jsfiddle.net/JTxdM/68/)
- [data-binding attributes](http://jsfiddle.net/JTxdM/71/)
- [if / elseif / else block](http://jsfiddle.net/JTxdM/75/)
- [html block helper](http://jsfiddle.net/JTxdM/76/)
- [onEnter event](http://jsfiddle.net/JTxdM/77/)
- [data-binding css](http://jsfiddle.net/JTxdM/81/)
- [data-binding styles](http://jsfiddle.net/JTxdM/78/)
- [binding helpers](http://jsfiddle.net/JTxdM/93/)
- [manually updating templates](http://jsfiddle.net/JTxdM/79/)
- [list benchmark](http://jsfiddle.net/JTxdM/65/) - 10k items
- [dots benchmark](http://jsfiddle.net/JTxdM/62/)

## Syntax

Paperclip takes on a mustache / handlebars approach with variables, blocks, and pollyfills. Paperclip also allows basic inline javascript, similar to angular.js.

### Blocks

Paperclip support variable blocks, just like Angular.js. [For example](http://jsfiddle.net/JTxdM/80/):


{{#example}}
{{#block:"index-pc"}}
<!--
hello {{ name.first }} {{ name.last }}!
-->
{{/}}
{{#block:"index-js"}}
<!--
var context = new mojo.Object({
  name: {
    first: "Morgan",
    last: "Freeman"
  }
});

var template = paperclip.template(require("./index.pc"), mojo.application);

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
var context = new mojo.Object({
  color: "blue"
});

var template = paperclip.template(require("./index.pc"), mojo.application);

preview.element.appendChild(template.bind(context).render());
-->
{{/}}
{{/}}

Paperclip also supports **inline javascript**. For example:

{{#example}}
{{#block:"index-pc"}}
<!--
hello {{ message || "World" }}!
-->
{{/}}
{{#block:"index-js"}}
<!--
var context = new mojo.Object({
});

var template = paperclip.template(require("./index.pc"), mojo.application);

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
var marked = require("marked");

mojo.application.paperclip.modifier("markdown", function(value) {
  return marked(value || "");
});

mojo.application.paperclip.modifier("divide", function(value, num) {
  return Math.round((value || 0) / num);
});

var context = new mojo.Object({
  content: "This is some **awesome** markdown!",
  age: 65
});

var template = mojo.application.paperclip.template(require("./index.pc"), mojo.application);

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
var context = new mojo.Object({
  fullName: "John Smith"
});
var template = mojo.application.paperclip.template(require("./index.pc"), mojo.application);
preview.element.appendChild(template.bind(context).render());
-->
{{/}}
{{/}}

Note that that `~fullName` tells paperclip not to watch the reference, so any changes to `fullName` don't get reflected in the view.

Binding helpers are especially useful for [paperclip components](https://github.com/mojo-js/paperclip-component). Say for instance you have a date picker:

<!-- todo - make this into a real example, or defer to docs below -->

```
{{
    datePicker: {
      currentDate: <~>currentDate
    }
}}
```

The above example will apply a two-way data-binding to the `datePicker.currentDate` property and the `currentDate` property of the view controller.

### Built-in components

#### &#123;&#123; html: content &#125;&#125;

Similar to escaping content in mustache (`&#123;&#123;&#123;content&#125;&#125;&#125;`). [For example](http://jsfiddle.net/JTxdM/76/):

```html
{{ html: content }}
```

#### &#123;&#123; #if: condition &#125;&#125;

Conditional block helper. [For example](http://jsfiddle.net/JTxdM/75/):

```
{{#if: age > 18 }}
  You're legally able to vote in the U.S.
{{/elseif: anotherCondition }}
  another condition
{{/else}}
  final condition
{{/}}
```

### data-bind attributes

data-bind attributes are borrowed from [knockout.js](http://knockoutjs.com/). This is useful if you want to attach behavior to any DOM element.


#### &#123;&#123; model: context &#125;&#125;

Input data-binding. [For example](http://jsfiddle.net/JTxdM/96/):

```html
<input type="text" name="message" data-bind={{ model: this }}></input> {{ message }}
```

You can also reference `message` directly. [For example](http://jsfiddle.net/JTxdM/94/)


```html
<input type="text" data-bind={{ model: <~>message }}></input> {{ message }}
```

Notice the `<~>` operator. This tells paperclip to bind both ways. See [binding operators](#binding-operators).


#### &#123;&#123; event: expression &#125;&#125;

Executed when an event is fired on the DOM element. Here are all the available events:

- `onChange` - called when an element changes
- `onClick` - called when an element is clicked
- `onLoad` - called when an element loads - useful for `<img />`
- `onSubmit` - called on submit - useful for `<form />`
- `onMouseDown` - called on mouse down
- `onMouseUp` - called on mouse up
- `onMouseOver` - called on mouse over
- `onMouseOut` - called on mouse out
- `onKeyDown` - called on key down
- `onKeyUp` - called on key up
- `onEnter` - called on enter key up
- `onDepete` - called on delete key up

[Basic example](http://jsfiddle.net/JTxdM/77/):

```html
<input type="text" data-bind={{ model: <~>name, onEnter: sayHello() }}></input>
```


#### &#123;&#123; show: bool &#125;&#125;

Toggles the display mode of a given element. This is similar to the ` &#123;&#123;#if: expression &#125;&#125;` conditional helper.


#### &#123;&#123; css: styles &#125;&#125;

Sets the css of a given element. [For example](http://jsfiddle.net/JTxdM/81/):

```html
<strong data-bind={{
  css: {
      cool    : temp > 0,
      warm    : temp > 60,
      hot     : temp > 90
  }
}}> It's pretty warm! </strong>
```

#### &#123;&#123; style: styles &#125;&#125;

Sets the style of a given element. [For example](http://jsfiddle.net/JTxdM/78/):

```
<span data-bind={{
  style: {
    color       : color,
    'font-size' : size
  }
}}> Hello World </span>
```

#### &#123;&#123; disable: bool &#125;&#125;

Toggles the enabled state of an element.

```
<button data-bind={{ disable: !formIsValid }}>Sign Up</button>
```

#### &#123;&#123; focus: bool &#125;&#125;

Focuses cursor on an element.

```
<input data-bind={{ focus: true }}></input>
```

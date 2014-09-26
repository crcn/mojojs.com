Paperclip-components allows you to break up your paperclip views into separate files, and re-use them in other parts 
of your application. This idea was derrived from [Ember Components](http://emberjs.com/api/classes/Ember.Component.html),
and [Angular Directives](http://docs.angularjs.org/guide/directive).

## Requirements

- [bindable.js](https://github.com/classdojo/bindable.js) - needed for registering components
- [NPM](http://nodejs.org), or [Bower](http://bower.io) - used to install `paperclip-compoennt`
- [paperclip](https://github.com/classdojo/paperclip.js)


## Installation

- Node: `npm install paperclip-component`
- Browser: `bower install paperclip-component`

## Usage

You'll first need to add `paperclip-component` as a plugin:

```javascript
var pc   = require("paperclip"),
pcc      = require("paperclip-component"),
bindable = require("bindable");

//where global components live.
var components = new bindable.Object();

//plugin paperclip-components, and point to the components dictionary
pc.use(pcc(components));
```

After you have that setup, you can start registering components. Here's one specific to a `node.js` application:

```javascript
components.set("mainLayout", require("./mainLayout"));
```

mainLayout.js:

```javascript
var mojo = require("mojojs"),
structr  = require("structr"),
pc       = require("paperclip")

var MainLayoutView = structr(mojo.View, {
  paper: pc.load(__dirname + "/mainLayout.pc")
});

module.exports = MainLayoutView;
```

mainLayout.pc:

```html
<html>
  <head>
  </head>
  <body>
    {{ html: sections.body }}
  </body>
</html>
```

After you've defined your component, you can use it in any template. Here's how you might use `mainLayout` in a `.pc` file:

hello.pc:

```html
{{#mainLayout}}
  {{#sections: "body" }}
    Hello World!
  {{/}}
{{/}}
```

The rendered output of `hello.pc` would be:

```html
<html>
  <head>
  </head>
  <body>
    Hello World!
  </body>
</html>
```







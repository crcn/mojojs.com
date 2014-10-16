{{
  properties: {
    category: "getting started"
  }
}}

#### Property Scope

Mojo views have the ability to inherit properties from their parent, all the way up to the root view. This feature is incredibly useful when you want to pass data from one view to another. A `user` model for for instance might be used in other parts of your application. All you need to do is set the user model in the root view, and `get()` that property in any sub-view. This pattern is a great way of avoiding singletons, and makes your code far more interchangeable, and modular. 

Of course, you can be as implicit, or explicit as you want. Mojo also has the ability to break property scope simply by setting a property in any sub-view. 

Take a look at the [property scope docs](/docs/api/viewsbase#propertyscope) for more info.


#### Compiled templates


Mojo templates (paperclip) are translated from HTML, straight to JavaScript - this also includes data-bindings. For example, here's a template:

```html
hello {{name}}!
```

Here's the translation to JavaScript:

```javascript
module.exports = (function(fragment, block, element, text, comment, parser, modifiers) {
  return fragment([text("hello "), block({
    'value': {
      run: function() {
          return this.context.name;
      },
      refs: [ ["name"] ]
    }
  })]);
});
```

Pretty clear what's going on here. Here's what we know at a glance:

1. Generated DOM is identical to the HTML we provide. No weird additions here.
2. Data-bindings are identified *as the template is created*. Note that this happens once for every template. Paperclip takes each translated template, caches them, and uses the browser's native `cloneNode()` whenever a template is used.
3. References are identified when translated from the template. 

As it turns out, the method above for generating views is insanely fast - [50k list items in 1 seconds fast](http://requirebin.com/?gist=d9ae1065106891f7d218). And paperclip is only getting faster.


#### Organization

TODO

<!--


### Organization

Intuitiveness

### Explicit & Implicitness

data bindings
property scope
router + views

### Gotchyas

Very few


### Architecture

modules were designed 

### Developer workflow

-->

<!--
Developer workflow
-->


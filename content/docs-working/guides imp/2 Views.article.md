{{
  properties: {
    category: "guides"
  }
}}

See Also: [Planning](/docs/guides/architecture), [views.Base](/docs/api/viewsbase), [views.List](/docs/api/viewslist), [views.Stack](/docs/api/viewsstack), [templates guide](/docs/guides/templates)


Views control what the user sees, and handles *all* user interactions invoked on its [template](/docs/guides/templates). Views are where your view-specific logic should go. 


Views are also be composed of many nested views, or [children](/docs/api/viewsbase#children). Nesting views is a great way to organize your application, and greatly simplifies your view logic. Typically, it's easier to build views based on what you see in your initial HTML + CSS mockup. For instance, here's a mockup of the [TodoMVC example](https://github.com/mojo-js/mojo-todomvc-example): 

<img src="/docs/todos.png"></img>


Here's what the view structure looks like:

```
views/
  main/
    index.js - defines children views, and logic specific to the main view
    index.pc - defines where the children views should go
    header/ 
      index.js 
      index.pc - controls new todo input
    todos/
      index.js - list of todos
      index.pc - defines where the list of todos should go
      todo/ 
        index.js - individual todo controller
        index.pc - todo template
    footer/
      index.js
      index.pc
```

Note that the `index` file is a common pattern used in CommonJS. It's similar to how `index.html` works. `require('./main')` for instance would automatically resolve to `./main/index.js`. 

The `.pc` files are paperclip templates. In the TodoMVC example, there's a template for each view controller, and they're both named the same to show they go together. 



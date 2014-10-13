{{
  properties: {
    category: "api"
  }
}}

See Also [Application](/docs/api/application), [models.Base](/docs/api/modelsbase), [models.Collection](/docs/api/modelscollection), [views.Base](/docs/api/viewsbase), [views.List](/docs/api/viewslist), [views.Stack](/docs/api/viewsstack), [router](/docs/api/router) <br />


This package comes pre-bundled with all the default Mojo plugins, including the [views](/docs/api/viewsbase), [models](/docs/api/viewsbase), [template engine](/docs/api/templates), and [http router](/docs/api/viewsbase).


### Installation

NPM:

```
npm install mojojs --save-exact
```

Browser:

First download https://raw.githubusercontent.com/mojo-js/mojo.js/master/build/mojo.min.js, then insert it in the `&lt;head /&gt;` of your document:

<!-- 
TODO: parse HTML from index.js, and display script (fake it). 
need to make IDE return strings  for unknown files
-->

{{#example}}
{{#block:"index-html"}}
<!--
<html>
  <head>
    <script type="text/javascript" src="./mojo.min.js"></script>
    <script type="text/javascript">
      var view = new mojo.Base({
        name: "World"
        paper: "Hello {{name}}!"
      });
      $(document).ready(function () {
        document.body.appendChild(view.render());
      });
    </script>
  </head>
  <body>
  </body>
</html>
-->
{{/}}
{{#block:"index-js"}}
<!--
console.log("no preview available");
-->
{{/}}
{{/}}

<!--
Bower
CDN
-->


#### application

the application instance

#### application.views

the property set by the [views](/docs/api/viewsbase) plugin. See http://www.mojojs.com/docs/api/application#views for documentation.

```javascript
mojo.application.models.register({
  main: MainView,
  confirmPopup: ComfirmPopupView,
});
```

#### application.paperclip

the property set by the [template](/docs/api/templates) plugin. 

```javascript
var tpl = application.paperclip.template("hello {{name}}");
document.body.appendChild(tpl.bind({ name: "Jim Carrey" }).render());
```

#### application.models

the property set by the [models](/docs/api/modelsbase) plugin. See http://www.mojojs.com/docs/api/application#models for documentation. 

```javascript
mojo.application.models.register({
  person: PersonModel,
  people: PeopleCollection
});
```

#### models

The models namespace. Contains `Base`, `Collection`.

```javascript
var people = new mojo.models.Collection([
  new mojo.models.Base({ name: "Johnny Depp"    }),
  new mojo.models.Base({ name: "Tom Cruise"     }),
  new mojo.models.Base({ name: "Angelina Jolie" })
]);
```

#### views

The views namespace. Contains `Base`, `Stack`, and `List`.

```javascript
var baseView = mojo.views.Base();
var stackView = mojo.views.Stack();
var listView = mojo.views.List();
```
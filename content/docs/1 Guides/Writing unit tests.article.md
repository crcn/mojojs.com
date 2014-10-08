{{
  properties: {
    category: "guides"
  }
}}

{{#example}}
{{#block:"index-js"}}
<!--
var HelloView = mojo.views.Base.extend({
  paper: require("./index.pc")
});
module.exports = function (element) {
  var view = new HelloView({
    name: "Jeff"
  });
  element.appendChild(view.render());
}
-->
{{/}}
{{#block:"index-pc"}}
<!--
Hello {{name}}!!
-->
{{/}}
{{/}}

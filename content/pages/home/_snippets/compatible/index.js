var marked = require("marked");

mojo.application.paperclip.modifier("markdown", function (v) {
  return marked(v || "");
});

var MarkedView = mojo.views.Base.extend({
    paper: require("./template.pc")
});

var view = new MarkedView({
    content: "Hello *world*, I'm **[Markdown](http://daringfireball.net/projects/markdown/syntax)**!"
});
preview.element.appendChild(view.render());

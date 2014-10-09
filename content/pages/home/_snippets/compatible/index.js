var marked = require("marked");

mojo.application.paperclip.modifier("markdown", function (v) {
  return marked(v || "");
});

var MarkedView = mojo.views.Base.extend({
    paper: require("./template.pc")
});

exports.initialize = function (options) {
    var view = new MarkedView({
        content: "Hello *world*, I'm **[Markdown](http://daringfireball.net/projects/markdown/syntax)**!"
    });
    options.element.appendChild(view.render());
};

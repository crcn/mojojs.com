var HelloView = mojo.views.Base.extend({
  paper: require("./helloView.pc")
});

var hello = new HelloView({
  message: "Hello World"
});

document.body.appendChild(hello.render());
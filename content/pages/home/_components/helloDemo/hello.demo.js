var HelloView = mojo.views.Base.extend({
  paper: require("text!hello.pc")
});

var helloView = new HelloView({
  message: "Hello Mojo!"
});

document.body.appendChild(helloView.render());
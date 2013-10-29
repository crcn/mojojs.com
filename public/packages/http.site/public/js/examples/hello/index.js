var mojo = require("mojojs");

var HelloView = mojo.View.extend({
  paper: require("./hello.pc")
});

var helloView = new HelloView();
helloView.attach($("#hello-application"));
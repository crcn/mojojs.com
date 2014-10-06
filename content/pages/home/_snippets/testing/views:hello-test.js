var HelloView = require("./hello"),
expect        = require("expect.js");

describe(__filename + "#", function () {

  var view, page;

  beforeEach(function () {
    view = new HelloView();
    page = $(page.render())
  });

  it("data-binds the input", function () {
    page.
      find("input").
      val("John").
      trigger($.Event("change"));
    expect(view.get("name")).to.be("John");
  });

  it("displays the name", function () {
    view.set("name", "Jeff");
    expect(page.find("h1").text()).to.be("Hello Jeff!!");
  });
});
var items = new mojo.Collection([
]);

var ItemView = mojo.views.Base.extend({
  paper: require("./item.pc")
});

var MainView = mojo.views.Base.extend({
  paper: require("./index.pc"),
  count: 200,
  children: {
    items: {
      type: "list",
      modelViewClass: ItemView,
      source: "items"
    }
  },
  renderItems: function () {

    var newItems = [];
    var startTime = Date.now();

    var self = this;
    this.get("children.items").once("resort", function () {
      self.set("duration", Date.now() - startTime);
    })


    for (var i = 0, n = this.count; i < n; i++) {
      newItems.push(new mojo.Object({ _id: i }));
    }

    this.set("items", new mojo.Collection(newItems));
  }
});

var mainView = new MainView();
preview.element.appendChild(mainView.render());

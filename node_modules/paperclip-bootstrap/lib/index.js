var pc = require("paperclip"),
bindable = require("bindable");

function BootstrapAttrBinding () {
  pc.BaseNodeBinding.apply(this, arguments);
}

pc.BaseNodeBinding.extend(BootstrapAttrBinding, {
  type: "attr",
  bind: function (context) {
    pc.BaseNodeBinding.prototype.bind.apply(this, arguments);

    if (!process.browser) return;

    var $node = $(this.node),
    data      = $node.data(),
    self = this;

    var d = new bindable.Object();

    for (var key in data) {
      var newKey = key.replace(/([A-Z])/g, ".$1").toLowerCase(); // camel case to dot syntax
      d.set(newKey, data[key]);
    }

    if (/ride|spy/.test(self.name)) {
      delete data[self.name];
      var spyOn = $node.attr(self.name);
      $node[spyOn].call($node, d.get(self.name) || d.context());
    }
  }
});

module.exports = function (pc) {
  ["data-spy", "data-ride"].forEach(function (attr) {
    pc.nodeBinding(attr, BootstrapAttrBinding);
  });
}
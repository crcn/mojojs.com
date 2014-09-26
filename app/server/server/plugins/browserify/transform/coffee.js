var coffee = require("coffee-script");

module.exports = {
  
  priority: 999,

  extension: "coffee",

  transform: function (content) {
    return coffee.compile(content, {
      bare: true
    });
  }
};

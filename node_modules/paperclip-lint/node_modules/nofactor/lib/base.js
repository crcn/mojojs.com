var protoclass = require("protoclass");

function BaseFactory () {

}

protoclass(BaseFactory, {

  /**
   */

  createElement: function (element) { },

  /**
   */

  createFragment: function () { },

  /**
   */

  createComment: function (value) { },

  /**
   */

  createTextNode: function (value) { },

  /**
   */

  parseHtml: function (content) { }
});



module.exports = BaseFactory;

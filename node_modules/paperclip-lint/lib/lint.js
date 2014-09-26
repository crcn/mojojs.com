var Report    = require("./report");

var linters = {
  element: [  


    /**
     * make sure there aren't any children for these elements
     */

    {
      lint: function (report, nodeName, attrs, children) {
        if (children && children.length > 0) {
          report.errors.push(new Error("element '"+nodeName+"' cannot have any children"));
        }
      },
      test: function (name) {
        return /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/.test(name);
      }
    },

    /**
     * make sure there aren't any children for these elements
     */

    /*{
      lint: function (report, nodeName, attrs, children) {
        report.errors.push(new Error("cannot add inline '"+nodeName+"' tags"));
      },
      test: function (name) {
        return /^(script)$/.test(name);
      }
    },*/

    /**
     * make sure that input type isn't dynamic
     */

    {
      lint: function (report, nodeName, attrs) {

        var type = attrs.type;
        if (!type) return;

        for (var i = type.length; i--;) {
          if (typeof type[i] === "object") {
            report.errors.push(new Error("input type cannot dynamically change"));
          }
        }
      },
      test: function (name) {
        return /input/.test(name);
      }
    },

    /**
     * check to make sure that a select field doesn't have a block child
     */

    {
      lint: function(report, nodeName, attrs, children) {
        if (!children) return;
        for (var i = children.length; i--;) {
          if(children[i].type == "block") {
            report.warnings.push(new Error("cannot dynamically change select menu in IE"));
          }
        }
      },
      test: function (name) {
        return /select/.test(name);
      }
    }


  ]
};



var lint = module.exports = function (template, report) {

  if (!report) report = new Report();

  function createLinter (type, linters) {
    if (!linters) linters = [];
    return function () {
      var args = Array.prototype.slice.call(arguments, 0);
      for (var i = linters.length; i--;) {
        if (linters[i].test.apply(this, arguments)) {
          linters[i].lint.apply(this, [report].concat(args));
        }
      }
      return { type: type };
    }
  }

  function block(script, contentTemplate, childTemplate) {
    if (contentTemplate) lint(contentTemplate, report);
    if (childTemplate) lint(childTemplate, report);
    return { type: "block" };
  }

  template(
    createLinter("fragment", linters.none), 
    block, 
    createLinter("element", linters.element), 
    createLinter("text", linters.text), 
    createLinter("parse", linters.parse)
  );

  return report;
};
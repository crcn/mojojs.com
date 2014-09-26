var Queue = require("./queue"),
async = require("async"),
outcome = require("outcome");

/**
 */

var Branch = module.exports  = function(options) {

  this.parent   = options.parent;
  this.commands = options.commands;
  this.index    = options.index || 1;
  this.selector = options.selector;
  this.multiple = options.multiple;
  this.root     = this._root();

  this._prepare();
}


/**
 */

Branch.prototype._prepare = function() {

  var self = this;

  //add all the commands registered with soda
  this.commands.forEach(function(command) {
    self[command] = self._getCommand(command);
  });
}


/**
 */

Branch.prototype._getCommand = function(command) {
  var self = this;
  return function() {
    var args = Array.prototype.slice.call(arguments), orgFn, fn, root = self.root,
    orgFn,
    methodSelector = "";


    if(self._prepend) {
      methodSelector = args.shift();
    }

    if(typeof args[args.length - 1] == "function") {
      orgFn = args.pop();
    } else {
      orgFn = function () { };
    }

    //pause the current chain
    root.
    nextSuccess(function(next) {

      var used = {}, results = [];

      //fetch ALL the selectors - even from parents
      self.getSelectors(outcome.e(next).s(function(selectors) {


        //invoke the command against ALL selectors
        async.forEachSeries(selectors, function(selector, next) {

          //this might happen if a selector is something like [contains(@class, 'child')], and checked
          // against <div class="children"><div class="child"></div></div>
          if(used[selector]) return next();
          used[selector] = 1;

          root[command + "Async"].apply(root, [selector + methodSelector].concat(args).concat(outcome.e(next).s(function(text) {

            var element = {
              path: selector,
              value: text
            };

            results.push(element);

            try {
              orgFn.call(element, text);
            } catch(e) {
              return next(e)
            }

            next();

          })));

        }, outcome.e(next).s(function() {
          self.currentResult = results;
          next();
        }));

      }));
    });

    return self;
  }
}


/**
 * selenium util for fetching the elements of a particular xpath - nothing's built in so we have to do it
 * ourselves
 */

var findElementsBrowserFn = function() {
  var ret = selenium.browserbot.locateElementsByXPath('[PATH]', selenium.browserbot.getDocument()).toArray();
  var paths = [];

  for(var i = ret.length; i--;) {
    var p = ret[i],
    c = p,
    ci = 0,
    path = [];

    while(p) {
      c = p;
      ci = 1;

      while((c = c.previousSibling) != null) 
        if(c.localName == p.localName)
          ci++;

      if(p.nodeName == "HTML") break;

      path.unshift(p.nodeName.toLowerCase() + "[" + ci + "]");

      p = p.parentNode;
    }

    paths.push(path.join("/"));
  }

  return JSON.stringify(paths);
}

/**
 * finds all the element xpaths from selenium with the given query
 */

function findElement(selector, callback) {
  return function(browser) {
    browser.
    getEvalAsync("("+String(findElementsBrowserFn).replace('[PATH]',selector.replace(/['"]+/g,'\\\''))+")()", outcome.e(callback).s(function(text) {

      callback(null, JSON.parse(text).map(function(path) {
        return "//" + path;
      }));
    }));
  }
}


/**
 * returns the current result from invoking a command against multiple
 * elements
 */


Branch.prototype.getResult = function(callback) {
  var self = this;
  this.root.nextSuccess(function(next) {
    callback(self.currentResult);
    next();
  });

  return this;
}


/**
 */

Branch.prototype.count = function(callback) {
  var self = this;
  return this.nextSuccess(function(next) {
    return self.getSelectors(outcome.e(next).s(function(selectors) {
      try {
        callback(selectors.length);
      } catch(e) {
        return next(e);
      }
      return next();
    }));
  });
}


/**
 * fetches all the selectors for this particular branch. Note that this is called each time 
 * a method is to be evaluated since the number of elements can change at any time.
 */

Branch.prototype.getSelectors = function(callback) {

  var self = this, allSelectors = [], root = this.root;


  self.parent.getSelectors(outcome.e(callback).s(function(selectors) {


      //go through each selector one at a time, otherwise selenium breaks
      async.forEachSeries(selectors, function(selector, next) {

        //combine the selector path - we use // since it means to find any child at any depth with the given
        //xpath
        var thisSelector = selector + self.selector;


        root.
        and(findElement(thisSelector, outcome.e(next).s(function(selectors) {
            allSelectors = allSelectors.concat(selectors);
            next();
        })));


      }, function(err) {

        //called element() instead of elements()
        if(allSelectors.length) {
          allSelectors = self.multiple ? allSelectors : [allSelectors[0]];
        }

        callback(err, allSelectors);
      });
  }));

  return this;
}

/**
 */

Branch.prototype.path = function() {
  return this.parent.path() + "//" + this.selector;
}


/**
 * returns the root branch (browser)
 */

Branch.prototype._root = function() {
  var p = this;
  while(p.parent) {
    p = p.parent;
  }
  return p;
}

var methods = ["end", "nextSuccess", "next", "nextError", "before", "and"];

methods.forEach(function(method) {
  Branch.prototype[method] = function() {
    var r = this.root;
    r[method].apply(r, arguments);
    return this;
  }
});


Branch.prototype.prepend = function(value) {
  this._prepend = value !== false;
  return this;
}


Branch.mixin = function(prototype) {
  /**
   */

  prototype.element = function(selector) {
    return this._branch(selector, false);
  }

  /**
   */

  prototype.elements = function(selector) {
    return this._branch(selector, true);
  }


  /**
   */

  if(!prototype.path)
  prototype.path = function() {
    return this.selector || "";
  }


  /**
   */

  if(!prototype.getSelectors)
  prototype.getSelectors = function(done) {
    done(null, [""]);
  }

  /**
   */

  prototype._branch = function(selector, multiple) {
    return new Branch({
      parent   : this,
      commands : this.commands,
      selector : selector,
      multiple : multiple
    });
  }

}


Branch.mixin(Branch.prototype);

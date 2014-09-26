var ent     = require("./ent"),
Base        = require("./base"),
protoclass  = require("protoclass");


function Node () {

}

protoclass(Node, {
  __isNode: true
});


function Container () {
  this.childNodes = [];
}

protoclass(Node, Container, {

  /**
   */

  appendChild: function (node) {

    if (node.nodeType === 11) {
      while (node.childNodes.length) {
        this.appendChild(node.childNodes[0]);
      }
      return;
    }

    this._unlink(node);
    this.childNodes.push(node);
    this._link(node);
  },

  /**
   */

  prependChild: function (node) {
    if (!this.childNodes.length) {
      this.appendChild(node);
    } else {
      this.insertBefore(node, this.childNodes[0]);
    }
  },

  /**
   */

  removeChild: function (child) {
    var i = this.childNodes.indexOf(child);

    if (!~i) return;

    this.childNodes.splice(i, 1);

    if (child.previousSibling) child.previousSibling.nextSibling = child.nextSibling;
    if (child.nextSibling)     child.nextSibling.previousSibling = child.previousSibling;

    delete child.parentNode;
    delete child.nextSibling;
    delete child.previousSibling;
  },

  /**
   */

  insertBefore: function (newElement, before) {

    if (newElement.nodeType === 11) {
      var before, node;
      for (var i = newElement.childNodes.length; i--;) {
        this.insertBefore(node = newElement.childNodes[i], before);
        before = node;
      }
    }

    this._splice(this.childNodes.indexOf(before), 0, newElement);
  },

  /**
   */

  _splice: function (index, count, node) {

    if (typeof index === "undefined") index = -1;
    if (!~index) return;

    if (node) this._unlink(node);
    
    this.childNodes.splice.apply(this.childNodes, arguments);

    if (node) this._link(node);
  },

  /**
   */

  _unlink: function (node) {
    if (node.parentNode) {
      node.parentNode.removeChild(node);
    }
  },

  /**
   */

  _link: function (node) {

    if (!node.__isNode) {
      throw new Error("cannot append non-node");
    }

    node.parentNode = this;
    var i = this.childNodes.indexOf(node);

    // FFox compatible
    if (i !== 0)                         node.previousSibling = this.childNodes[i - 1];
    if (i != this.childNodes.length - 1) node.nextSibling     = this.childNodes[i + 1];

    if (node.previousSibling) node.previousSibling.nextSibling = node;
    if (node.nextSibling)     node.nextSibling.previousSibling = node;
  }
});



function Style () {

}

protoclass(Style, {

  /**
   */

  _hasStyle: false,

  /**
   */


  setProperty: function(key, value) {

    if (value === "" || value == undefined) {
      delete this[key];
      return;
    }

    this[key] = value;
  },

  /**
   */

  parse: function (styles) {
    var styleParts = styles.split(/;\s*/);

    for (var i = styleParts.length; i--;) {
      var sp = styleParts[i].split(/:\s*/);

      if (sp[1] == undefined || sp[1] == "") {
        continue;
      }

      this[sp[0]] = sp[1];
    }
  },

  /**
   */

  toString: function () {
    var buffer = [];
    for (var key in this) {
      if(this.constructor.prototype[key] !== undefined) continue;

      var v = this[key];

      if (v === "") {
        continue;
      }

      buffer.push(key + ": " + this[key]);
    }

    if(!buffer.length) return "";

    return buffer.join("; ") + ";"
  },

  /**
   */

  hasStyles: function () {
    if(this._hasStyle) return true;

    for (var key in this) {
      if (this[key] != undefined && this.constructor.prototype[key] == undefined) {
        return this._hasStyle = true;
      }
    }

    return false;
  }
});


function Element (nodeName) {
  Element.superclass.call(this);

  this.nodeName    = nodeName.toUpperCase();
  this._name       = nodeName.toLowerCase();
  this.attributes  = [];
  this._attrsByKey = {};
  this.style       = new Style();

}

protoclass(Container, Element, {

  /**
   */

  nodeType: 3,

  /**
   */

  setAttribute: function (name, value) {
    name = name.toLowerCase();

    if (name === "style") {
      return this.style.parse(value);
    }

    if (value == undefined) {
      return this.removeAttribute(name);
    }

    var abk;

    if (!(abk = this._attrsByKey[name])) {
      this.attributes.push(abk = this._attrsByKey[name] = {})
    }

    abk.name  = name;
    abk.value = value;
  },

  /**
   */

  removeAttribute: function (name) {

    for (var i = this.attributes.length; i--;) {
      var attr = this.attributes[i];
      if (attr.name == name) {
        this.attributes.splice(i, 1);
        break;
      }
    }

    delete this._attrsByKey[name];
  },

  /**
   */

  getAttribute: function (name) {
    var abk;
    if(abk = this._attrsByKey[name]) return abk.value;
  },

  /**
   */

  toString: function () {

    var buffer = ["<", this._name],
    attribs    =  [],
    attrbuff;

    for (var name in this._attrsByKey) {

      var v    = this._attrsByKey[name].value;
      attrbuff = name;

      if (name != undefined) {
        attrbuff += "=\"" + v + "\"";
      }

      attribs.push(attrbuff);
    }

    if (this.style.hasStyles()) {
      attribs.push("style=" + "\"" + this.style.toString() + "\"");
    }

    if (attribs.length) {
      buffer.push(" ", attribs.join(" "));
    }

    buffer.push(">");
    buffer.push.apply(buffer, this.childNodes);
    buffer.push("</", this._name, ">");

    return buffer.join("");
  }
});


function Text (value, encode) {

  if (encode) {
    value = ent(value);
  }

  this.value = value;
}

protoclass(Node, Text, {

  /**
   */

  nodeType: 3,

  /**
   */

  toString: function () {
    return this.value;
  }
});

function Comment () {
  Comment.superclass.apply(this, arguments);
}

protoclass(Text, Comment, {

  /**
   */

  nodeType: 8,

  /**
   */

  toString: function () {
    return "<!--" + Comment.__super__.toString.call(this) + "-->";
  }
});

function Fragment () {
  Fragment.superclass.call(this);
}

protoclass(Container, Fragment, {

  /**
   */

  nodeType: 11,

  /**
   */

  toString: function () {
    return this.childNodes.join("");
  }
});

function StringNodeFactory (context) {
  this.context = context;
}

protoclass(Base, StringNodeFactory, {

  /**
   */

  name: "string",

  /**
   */

  createElement: function (name) {
    return new Element(name);
  },

  /**
   */

  createTextNode: function (value, encode) {
    return new Text(value, encode);
  },

  /**
   */

  createComment: function (value) {
    return new Comment(value);
  },

  /**
   */

  createFragment: function (children) {
    if (!children) children = [];
    var frag = new Fragment(),
    childrenToArray = Array.prototype.slice.call(children, 0);

    for (var i = 0, n = childrenToArray.length; i < n; i++) {
      frag.appendChild(childrenToArray[i]);
    }

    return frag;
  },

  /**
   */

  parseHtml: function (buffer) {

    //this should really parse HTML, but too much overhead
    return this.createTextNode(buffer);
  }
});

module.exports = new StringNodeFactory();
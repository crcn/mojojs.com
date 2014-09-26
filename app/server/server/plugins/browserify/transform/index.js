var through = require("through"),
fs          = require("fs"),
path        = require("path");


//include all the script transformers
var transformers = fs.readdirSync(__dirname).filter(function(name) {
  return !/(^\.|index)/.test(name);
}).map(function(name) {
  return require(path.join(__dirname, name));
}).sort(function (a, b) {
  return (a.priority || 0) > (b.priority || 0) ? 1 : -1;
})

module.exports = function (scriptPath) {

  var buffer = [];

  return through(write, end);

  function write (chunk) {
    buffer.push(chunk);
  }

  function end () {
    var i, content = buffer.join(""), transformer;

    for(i = transformers.length; i--;) {
      transformer  = transformers[i];
      if(scriptPath.split(".").pop() == transformer.extension) {
        try {
          content = transformer.transform(content, scriptPath);
        } catch (e) {
          console.error("unable to process %s", scriptPath);
          console.error(e.stack);
        }
      };
    }

    this.queue(content);
    this.queue(null);
  }
};


module.exports.extensions = transformers.map(function(transformer) {
  return "." + transformer.extension;
});
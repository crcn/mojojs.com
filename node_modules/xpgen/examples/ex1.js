var xpgen = require("../")();

console.log(xpgen.find().contains("class", "test").and().gt("href", "hello").find("div").register("#test").toString())
console.log(xpgen.chain("#test").find().contains("abc", "123").toString());
console.log(xpgen.chain("#test").toString())
process.stdin.setEncoding("utf8");


var buffer = [];

process.stdin.on("data", function (chunk) {
  buffer.push(chunk.toString());
});

process.stdin.on("end", function () {
  var content = buffer.join("\n");

  content = content.replace(/```[\s\S]+?```/g,"")
  content  = content.replace(/({{#[\s\S]+?}}[\s\S]+?{{\/}})|({{[\s\S]+?}})/g,"")

  var words = content.match(/\b[\w]+\b/g) || [];
  console.log(words.length);
});
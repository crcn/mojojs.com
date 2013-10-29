examples = $ "[data-example]"


for node in examples then do (node) =>
  console.log $(node).attr("data-example")
  $.get $(node).attr("data-example"), (data) =>
    node.innerHTML = "<code data-language='"+$(node).attr("data-lang")+"'>" + data + "</code>"
    Rainbow.color node, () =>
      console.log node
  
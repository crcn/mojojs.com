Nofactor is a light DOM API wrapper that's supported in node.js, and in the browser (IE 6+, Chrome, Firefox, Opera, Safari). It's used for DOM creation / manipulation in [paperclip.js](/classdojo/paperclip.js). [![Alt ci](https://travis-ci.org/classdojo/nofactor.js.png)](https://travis-ci.org/classdojo/nofactor.js)


```javascript
var nofactor = require("nofactor"),

// pick the default DOM adapter - node, or browser (thin).
nostr = nofactor.default; 


var element = nostr.createElement("div"),
element.setAttribute("id", "test");


console.log(element.toString()); //<div id="test"></div>
```

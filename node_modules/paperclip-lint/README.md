paperclip lint is a command line utility that checks your paperclip templates to make sure they're compatible with all browsers. [![Build Status](https://travis-ci.org/classdojo/paperclip-lint.png)](https://travis-ci.org/classdojo/paperclip-lint)

CLI Usage:

```bash
pclint ./path/to/template.pc
```

javascript usage:

```javascript
var pclint = require("paperclip-lint"),
report = pclint(templateTn);

console.log(report.warnings);
console.log(report.errors);
```
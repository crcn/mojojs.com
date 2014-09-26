Checks a given API endpoint to make sure it's not blocked by a network, and returns either a secure, or unsecure API url. It works by pinging the `okEndpoint` a GET, and waiting for a 20x level response.

### Features

- caches SSL support for 1 day
- times out after 8 seconds


### Example

```javascript

var httpsify = require("httpsify");

httpsify("/api", "http://api.domain.com/api/", function (url) {
  console.log("https://api.domain.com/api");
});
```


### httpsify(okEndpoint, url, callback)

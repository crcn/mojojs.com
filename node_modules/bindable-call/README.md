Makes it easy to bind asynchronous function calls. [![Alt ci](https://travis-ci.org/classdojo/bindable-call.png)](https://travis-ci.org/classdojo/bindable-call)



## Example

```javascript

var bindableCall = require("bindable-call"),
username = "user",
password = "password";

var loginCall = bindableCall(function(next) {
  login(username, password, next);
});



loginCall.bind("loading").once().to(function(loading) {
  
}).now();

loginCall.bind("error").once().to(function(error) {
  console.log(error.message);
}).now();

loginCall.bind("data").once().to(function(data) {
  console.log(data);
}).now();

loginCall.bind("response").once().to(function(response) {
  console.log(response.error, response.data);
}).now();
```


## Mojo.js Example


login.coffee

```coffeescript
class LoginView extends mojo.View

  ###
  ###
  
  paper: require("./login.pc")
  
  ###
  ###
  
  bindings:
    "loginCall.loading" : "loading"
    "loginCall.error"   : "error"
  
  ###
  ###
  
  login: () ->
  
    @set "loginCall", bindableCall (next) =>
      mediator.execute "login", {
        username: @get("username"),
        password: @get("password")
      }, next
      
```

login.pc

```html


{{#if: loading }}
  loading...
{{/else}}

  {{#if: error }}
    {{ error.message }}
  {{/}}
  
  <input type="text" name="username" data-bind="{{ model: this }}"></input>
  <input type="text" name="password" data-bind="{{ model: this }}"></input>
{{/}}
```

packages = require "packages"
bindable = require "bindable"

packages().
require({
  config: new bindable.Object({
    http: {
      port: 8080
    }
  })
}).
require(__dirname + "/packages").
load()
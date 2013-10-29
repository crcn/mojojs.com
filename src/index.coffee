packages = require "packages"
bindable = require "bindable"

packages().
require({
  config: new bindable.Object({
    http: {
      port: process.env.PORT || 8080
    }
  })
}).
require(__dirname + "/packages").
load()
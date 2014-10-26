ClassDojoWebsiteApplication = require "./application"
bindable = require "bindable"
path     = require "path"

app = new ClassDojoWebsiteApplication({
  http: {
    port: process.env.PORT || 8080
  },
  mongo: {
    url: process.env.MONGOHQ_URL || "mongodb://localhost:27017/mojojs"
  }
  directories: {
    public: path.normalize(__dirname + "/../../content/public"),
    content: path.normalize(__dirname + "/../../content"),
    root: path.normalize(__dirname + "/../../"),
    pages: path.normalize(__dirname + "/../../content/pages")
    docs: path.normalize(__dirname + "/../../content/docs")
  }
})

app.initialize()

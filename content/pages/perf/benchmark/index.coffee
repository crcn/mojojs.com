views = require "mojo-views"

class BechmarkView extends views.Base
  paper: require("./index.pc")
  sections:
    results: 
      type: "list"
      source: "model.results"
      sort: (a, b) -> if a.speed > b.speed then 1 else -1
      modelViewClass: views.Base.extend
        paper: require("./result.pc")
  
module.exports = BechmarkView
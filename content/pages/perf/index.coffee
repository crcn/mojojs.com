views = require "mojo-views"
bindable = require "bindable"

benchmarks = [
  {
    browser: "Chrome 34",
    # 5 samples 100 each
    results: [
      { name: "Mojo", speed: 621.0743999981787, highlight: true },
      { name: "Vue", speed: 332.1295999994618 },
      { name: "Backbone", speed: 702.2851999980048 },
      { name: "Knockout", speed: 547.7864000029513 },
      { name: "Ember", speed: 1973.921200001496 },
      { name: "Angular", speed: 1460.3718000027584 },
      { name: "React", speed: 1355.3468000041903 },
      { name: "Om", speed: 624.328599999717 },
      { name: "Ractive", speed: 1624.328599999717 }
    ]
  },
  {
    browser: "Safari 7",
    # 5 samples 100 each
    results: [
      { name: "Mojo", speed: 577.4, highlight: true },
      { name: "Vue", speed: 155.4 },
      { name: "Backbone", speed: 891 },
      { name: "Knockout", speed: 549.2 },
      { name: "Ember", speed: 1263.4 },
      { name: "Angular", speed: 1736.4 },
      { name: "React", speed: 1017 },
      { name: "Om", speed: 566.4 },
      { name: "Ractive", speed: 1173.4 }
    ]
  },
  {
    # 5 samples 100 each
    browser: "Firefox 34",
    results: [
      { name: "Mojo", speed: 1128.4932865999697, highlight: true },
      { name: "Vue", speed: 1316.4165856000086 },
      { name: "Backbone", speed: 1185.4238143999996 },
      { name: "Knockout", speed: 1013.1999927999877 },
      { name: "Ember", speed: 1977.0499120000081 },
      { name: "Angular", speed: 1571.606882000011 },
      { name: "React", speed: 1567.7778679999944 },
      { name: "Om", speed: 1726.7427250000153 },
      { name: "Ractive", speed: 1849.8269878000149 }
    ]
  }
]



class PerfView extends views.Base
  paper: require("./index.pc")
  sections:
    todoMVCBenchmarks:
      type: "list"
      source: benchmarks
      modelViewClass: require("./benchmark")
  

module.exports = PerfView
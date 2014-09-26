var expect = require("expect.js"),
pclint     = require(".."),
pc         = require("paperclip");


describe("pclint#", function () {

  /**
   */

  "area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr".split("|").forEach(function (tag) {
    it("doesn't allow '"+tag+"' to have any children", function () {
      var report = pclint(pc.compile("<"+tag+">blah</"+tag+">"));
      expect(report.errors[0].message).to.contain("element '"+tag+"' cannot have");
    });
  });

  /**
   */

  it("doesn't allow for dynamic types on inputs", function () {
    var report = pclint(pc.compile("<input type='{{type}}'></input>"));
    expect(report.errors[0].message).to.contain("cannot dynamically change");
  });

  /**
   */

  it("cannot use a dynamic list in a select menu", function () {
    var report = pclint(pc.compile("<select>{{ html: sections.options }}</select>"));
    expect(report.warnings[0].message).to.contain("cannot dynamically change");
  });

  /**
   */

  it("can inspect a block", function () {
    var report = pclint(pc.compile("{{#block}}<input type='{{type}}' />{{/}}"));
    expect(report.errors[0].message).to.contain("cannot dynamically change");
  });

  /**
   */

  it("can inspect a child block", function () {
    var report = pclint(pc.compile("{{#block}}{{/else}}<input type='{{type}}' />{{/}}"));
    expect(report.errors[0].message).to.contain("cannot dynamically change");
  });

  it("can inspect a sub-block", function () {
    var report = pclint(pc.compile("{{#block}}{{#block}}<input type='{{type}}' />{{/}}{{/}}"));
    expect(report.errors[0].message).to.contain("cannot dynamically change");
  });



});
var ewe = require("..")(),
expect  = require("expect.js");

describe("ewe", function() {

  var group, test;


  it("can create a test scope", function() {
    group = ewe.group("ab-test");
  });


  it("can create a test", function() {
    test = group.test("select test").
    control("control 1", 1).
    variant("variant 2", 2);
  })

  it("can select a variant", function() {
    expect(test.select().value).to.be(1);
    group.key = "ab-test1"
  });

  it("can select the right variant2", function() {
    expect(test.select().value).to.be(2);
  });

})
var frills = require(".."),
expect     = require("expect.js");

describe("frills#", function () {

  it("can create a new frills decorator", function () {
    frills();
  });

  it("can register a decorator", function () {
    var d = frills();
    d.use({
      getOptions: function (data) {
      },
      decorate: function (target, options) {
      }
    })
  });

  it("can prioritize decorators", function () {
    var d = frills();
    d.priority("a", 1).priority("b", 2);

    var a, b, c;

    d.use(b = { prority: "b" });
    d.use(a = { prority: "a" });
    d.use(c = { prority: "c" });

    expect(d._decorators[0]).to.be(c);
    expect(d._decorators[1]).to.be(b);
    expect(d._decorators[2]).to.be(a);
  })

  it("can decorate an object", function () {
    var d = frills();
    d.use({
      getOptions: function (target) {
        return target.events;
      },
      decorate: function (target, options) {
        target.found = options;
      }
    });

    var a = { events: 1 };
    expect(Object.__decorators).to.be(undefined);
    d.decorate(a);
    expect(Object.__decorators).to.be(undefined);
    expect(a.found).to.be(1);
  });

  it("decorates from a class prototype", function () {
    var clazz = function () {
    };

    clazz.prototype.events = 1

    var d = frills();
    d.use({
      getOptions: function (target) {
        return target.events;
      },
      decorate: function (target, options) {
        target.found = options;
      }
    });

    var a = new clazz();

    expect(a.__decorators).to.be(undefined);
    d.decorate(a);
    expect(a.__decorators).not.to.be(undefined);

    expect(a.found).to.be(1);
  });

  it("doesn't decorate if a property is not a prototype of the class", function () {
    var clazz = function () {
      this.events = 1;
    };

    var d = frills();
    d.use({
      getOptions: function (target) {
        return target.events;
      },
      decorate: function (target, options) {
        target.found = options;
      }
    });

    var a = new clazz(1);

    d.decorate(a);

    expect(a.found).to.be(undefined);
  });

});

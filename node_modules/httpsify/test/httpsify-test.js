var expect = require("expect.js"),
sinon      = require("sinon"),
superagent = require("superagent"),
httpsify   = require("..");

describe("httpsify#", function () {

  var saStub;

  beforeEach(function () {
    if (saStub) saStub.restore();
    saStub = sinon.stub(superagent.Request.prototype, "end");
  });

  afterEach(function () {
    saStub.restore();
    saStub = void 0;
  });

  /**
   */

  describe("parsing urls", function () {

    it("works if ok url has domain, but req url doesn't", function (next) {
      saStub.yields(null, { status: 200 });
      httpsify("https://api.domain.com", "/request", function (url) {
        expect(url).to.be("https://api.domain.com/request");
        next();
      });
    });

    it("works if ok url has a protocol of http", function (next) {
      saStub.yields(null, { status: 200 });
      httpsify("http://api.domain.com", "/request", function (url) {
        expect(url).to.be("https://api.domain.com/request");
        next();
      });
    });

    it("works if ok url has just a path, and the url has a domain", function (next) {
      saStub.yields(null, { status: 200 });
      httpsify("/", "http://api.domain.com/request", function (url) {
        expect(url).to.be("https://api.domain.com/request");
        next();
      });
    });
  });

  it("uses http if the response is a 200", function (next) {
    saStub.yields(null, { status: 500 });
    httpsify("/", "http://api.domain.com/request", function (url) {
      expect(url).to.be("http://api.domain.com/request");
      next();
    });
  });

  it("uses https if the response is a 200", function (next) {
    saStub.yields(null, { status: 200 });
    httpsify("/", "http://api.domain.com/request", function (url) {
      expect(url).to.be("https://api.domain.com/request");
      next();
    });
  });

  it("uses https if the response is a 201", function (next) {
    saStub.yields(null, { status: 201 });
    httpsify("/", "http://api.domain.com/request", function (url) {
      expect(url).to.be("https://api.domain.com/request");
      next();
    });
  });
});
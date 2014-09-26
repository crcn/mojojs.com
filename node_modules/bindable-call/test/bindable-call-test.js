var expect = require('expect.js'),
bindableCall = require("..");

describe("bindable-call#", function() {


  function login(user, pass, next) {
    var complete = function() {
      var args = arguments;
      setTimeout(function() {
        next.apply(this, args);
      }, 0);
    }

    if(user != "user" || pass != "pass") return complete(new Error("unauthorized"));
    complete(null, { user: "user", pass: "pass" });
  }

  it("can bind to the loading property", function(next) {
    var call = bindableCall(function(next) {
      login("user", "pass", next);
    });

    call.bind("loading", { max: 1, to: function(value) {
      expect(value).to.be(true);
      call.bind("loading", { max: 1, to: function(value) {
        expect(value).to.be(true);
        next();
      }}).now()
    }}).now();
  });

  it('can bind to the error property', function(next) {

    var call = bindableCall(function(next) {
      login("userab", "pass", next);
    });

    call.bind("error", { to: function(err) {
      expect(err.message).to.be("unauthorized");
      next();
    }}).now();
  });

  it("can bind to the data property", function(next) {

    var call = bindableCall(function(next) {
      login("user", "pass", next);
    });

    call.bind("data", { max: 1, to: function(data) {
      expect(data.user).to.be("user");
      expect(data.pass).to.be("pass");
      next();
    }}).now();
  });

  it("can bind to the response property", function(next) {

    var call = bindableCall(function(next) {
      login("user", "pass", next);
    });

    call.bind("response", { max: 1, to: function(response) {
      expect(response.data.user).to.be("user");
      expect(response.data.pass).to.be("pass");
      next();
    }}).now();
  });

  it("can bind to the success property", function(next) {
    var call = bindableCall(function(next) {
      login("user", "pass", next);
    }),
    call2 = bindableCall(function(next) {
      login("user2", "pass", next);
    })

    call.bind("success", { max: 1, to: function(value) {
      expect(value).to.be(true);
      call2.bind("success", { max: 1, to: function(value) {
        expect(value).to.be(false);
        next();
      }});
    }});
  });

  it("can pass args in the second param", function (next) {
    bindableCall(function (value, complete) {
      expect(value).to.be("abba");
      complete();
    }, "abba").bind("success", { max: 1, to: function () {
      next()
    }}).now();
  })
});
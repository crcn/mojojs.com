module.exports = function (router) {

  var hasher = require("hasher");

  function onHashChange (newHash) {

    // make sure any hash stuff isn't included
    router.redirect(String(newHash || window.location.pathname).replace(/^#?!?\/?(.*)/,"/$1"), function (err) {
      console.log(err);
      if (err && err.code === "404") {
        router.redirect("404");
      }
    });
  }

  router.bind("_location.url", function (url) {
    window.location.hash = "!" + url
  });

  hasher.changed.add(onHashChange);
  hasher.initialized.add(onHashChange);

  router.once("init", function () {
    hasher.init();
  })
}

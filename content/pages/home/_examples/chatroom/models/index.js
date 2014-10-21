module.exports = function (app) {
  app.models.register({
    message: require("./message"),
    messages: require("./messages")
  });
};
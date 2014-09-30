module.exports = function (app) {
  app.models.register({
    todo: require("./todo"),
    todos: require("./todos")
  });
}
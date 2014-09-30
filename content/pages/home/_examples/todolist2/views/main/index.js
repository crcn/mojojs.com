var views = require("mojo-views");

var TodoView = views.Base.extend({
  paper: require("./todo.pc")
})

module.exports = views.Base.extend({
  paper: require("./index.pc"),
  children: {
    todos: {
      type: "list",
      source: "todos",
      modelViewClass: TodoView
    }
  },
  addNewTodo: function (text) {
    if (!text) return;
    this.set("newTodoText", void 0);
    this.todos.create({ text: text, done: false });
  },
  clearCompleted: function () {
    this.todos.clearCompleted();
  }
});
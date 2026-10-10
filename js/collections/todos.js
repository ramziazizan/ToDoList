(function (root, Backbone) {
  "use strict";

  root.TodoApp = root.TodoApp || {};
  root.TodoApp.TodoList = Backbone.Collection.extend({
    model: root.TodoApp.Todo,
    localStorage: new Backbone.LocalStorage("backbone-todo-list"),

    completed: function () {
      return this.where({ completed: true });
    },

    remaining: function () {
      return this.where({ completed: false });
    }
  });
})(window, Backbone);

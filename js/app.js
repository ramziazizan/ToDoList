(function (root, Backbone) {
  "use strict";

  var app = root.TodoApp;
  app.todos = new app.TodoList();
  app.router = new app.Workspace();
  app.view = new app.AppView({
    todos: app.todos,
    router: app.router
  });

  Backbone.history.start();
})(window, Backbone);

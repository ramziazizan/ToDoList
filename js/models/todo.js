(function (root, Backbone) {
  "use strict";

  root.TodoApp = root.TodoApp || {};
  root.TodoApp.Todo = Backbone.Model.extend({
    defaults: {
      title: "",
      completed: false
    }
  });
})(window, Backbone);

(function (root, Backbone) {
  "use strict";

  root.TodoApp = root.TodoApp || {};
  root.TodoApp.Workspace = Backbone.Router.extend({
    routes: {
      "*filter": "setFilter"
    },

    setFilter: function (filter) {
      this.filter = filter === "active" || filter === "completed" ? filter : "all";
      this.trigger("filter", this.filter);
    }
  });
})(window, Backbone);

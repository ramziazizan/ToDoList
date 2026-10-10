(function (root, Backbone) {
  "use strict";

  root.TodoApp = root.TodoApp || {};
  root.TodoApp.Workspace = Backbone.Router.extend({
    routes: {
      "*filter": "setFilter"
    },

    setFilter: function (filter) {
      this.filter = filter === "Aktif" || filter === "Selesai" ? filter : "Semua";
      this.trigger("filter", this.filter);
    }
  });
})(window, Backbone);

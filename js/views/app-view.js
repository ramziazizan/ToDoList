(function (root, $, Backbone) {
  "use strict";

  root.TodoApp = root.TodoApp || {};
  root.TodoApp.AppView = Backbone.View.extend({
    el: ".app-shell",

    events: {
      "submit #todo-form": "createTodo",
      "click #clear-completed": "clearCompleted"
    },

    initialize: function (options) {
      this.todos = options.todos;
      this.router = options.router;
      this.todoViews = {};
      this.$list = this.$("#todo-list");
      this.$emptyState = this.$("#empty-state");
      this.$footer = this.$("#list-footer");
      this.$summary = this.$("#list-summary");
      this.$count = this.$("#todo-count");
      this.$clearCompleted = this.$("#clear-completed");

      this.listenTo(this.todos, "add", this.addOne);
      this.listenTo(this.todos, "reset", this.addAll);
      this.listenTo(this.todos, "all", this.render);
      this.listenTo(this.router, "filter", this.updateFilterLinks);

      this.todos.fetch();
      this.updateFilterLinks(this.router.filter || "all");
      this.render();
    },

    createTodo: function (event) {
      event.preventDefault();
      var $input = this.$("#new-todo");
      var title = $.trim($input.val());

      if (!title) {
        return;
      }

      this.todos.create({ title: title, completed: false });
      $input.val("");
    },

    addOne: function (todo) {
      if (!this.todoViews[todo.cid]) {
        this.todoViews[todo.cid] = new root.TodoApp.TodoView({
          model: todo,
          router: this.router
        }).render();
      }
    },

    addAll: function () {
      Object.keys(this.todoViews).forEach(function (cid) {
        this.todoViews[cid].remove();
      }, this);
      this.todoViews = {};
      this.todos.each(this.addOne, this);
    },

    render: function () {
      var self = this;
      var currentCids = {};

      this.todos.each(function (todo) {
        currentCids[todo.cid] = true;
        self.addOne(todo);
        var view = self.todoViews[todo.cid];
        self.$list.append(view.el);
        view.applyFilter();
      });

      Object.keys(this.todoViews).forEach(function (cid) {
        if (!currentCids[cid]) {
          self.todoViews[cid].remove();
          delete self.todoViews[cid];
        }
      });

      var hasTodos = this.todos.length > 0;
      this.$emptyState.prop("hidden", hasTodos);
      this.$footer.prop("hidden", false);
      this.$summary.prop("hidden", !hasTodos);

      var activeCount = this.todos.remaining().length;
      this.$count.text(activeCount + " tugas tersisa");
      this.$clearCompleted.prop("hidden", this.todos.completed().length === 0);

      return this;
    },

    updateFilterLinks: function (filter) {
      this.$(".filter-link").each(function () {
        var $link = $(this);
        var selected = $link.data("filter") === filter;
        $link.toggleClass("selected", selected);

        if (selected) {
          $link.attr("aria-current", "page");
        } else {
          $link.removeAttr("aria-current");
        }
      });
    },

    clearCompleted: function () {
      this.todos.completed().slice().forEach(function (todo) {
        todo.destroy();
      });
    }
  });
})(window, jQuery, Backbone);

(function (root, $, _, Backbone) {
  "use strict";

  root.TodoApp = root.TodoApp || {};
  root.TodoApp.TodoView = Backbone.View.extend({
    tagName: "li",
    className: "todo-item",
    template: _.template($("#todo-template").html()),

    events: {
      "click .todo-toggle": "toggleCompleted",
      "dblclick .todo-title": "startEditing",
      "click .delete-button": "deleteTodo",
      "keydown .edit-input": "handleEditKeydown",
      "blur .edit-input": "finishEditing"
    },

    initialize: function (options) {
      this.router = options.router;
      this.listenTo(this.model, "change", this.render);
      this.listenTo(this.router, "filter", this.applyFilter);
    },

    render: function () {
      this.$el.html(this.template());
      this.$el.toggleClass("completed", this.model.get("completed"));
      this.$(".todo-title").text(this.model.get("title"));
      this.$(".edit-input").val(this.model.get("title"));
      this.$(".todo-toggle").attr(
        "aria-label",
        this.model.get("completed") ? "Tandai tugas belum selesai" : "Tandai tugas selesai"
      );
      this.applyFilter();
      return this;
    },

    applyFilter: function () {
      var filter = this.router.filter || "all";
      var completed = this.model.get("completed");
      var visible = filter === "all" || (filter === "active" && !completed) ||
        (filter === "completed" && completed);
      this.$el.prop("hidden", !visible);
    },

    toggleCompleted: function () {
      this.model.save({ completed: !this.model.get("completed") });
    },

    startEditing: function () {
      this.$el.addClass("editing");
      this.$(".edit-input").trigger("focus").trigger("select");
    },

    handleEditKeydown: function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        this.finishEditing();
      } else if (event.key === "Escape") {
        this.$(".edit-input").val(this.model.get("title"));
        this.$(".edit-input").trigger("blur");
      }
    },

    finishEditing: function () {
      if (!this.$el.hasClass("editing")) {
        return;
      }

      var title = $.trim(this.$(".edit-input").val());
      this.$el.removeClass("editing");

      if (title) {
        this.model.save({ title: title });
      } else {
        this.model.destroy();
      }
    },

    deleteTodo: function () {
      this.model.destroy();
    }
  });
})(window, jQuery, _, Backbone);

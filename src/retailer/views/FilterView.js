var App = App || {};

App.views.FilterView = Backbone.View.extend({
  el: "#filters",

  events: {},

  initialize: function(options) {
    this.options = options.data;
    _.bindAll(this, "render");
    this.render();
  },

  render: function() {
    var self = this;
    $.get("/src/templates/filters.hbs", function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template({
        data: self.options
      });
      self.$el.html(finalHtml);
    });
    return self;
  }
});

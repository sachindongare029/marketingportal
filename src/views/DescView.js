var App = App || {};

App.views.DescView = Backbone.View.extend({
  el: "#desc",

  events: {},

  initialize: function() {
    _.bindAll(this, "render");
    this.render();
  },

  render: function() {
    var self = this;
    $.get("/src/templates/desc.hbs", function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template();
      self.$el.html(finalHtml);
    });
    return self;
  },
});

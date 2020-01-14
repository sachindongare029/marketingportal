var App = App || {};

App.views.ResultView = Backbone.View.extend({
  el: "#results",

  events: {
    "click #copy-link": "copyLink",
    "click #download": "download",
    "click #preview": "preview"
  },

  initialize: function(options) {
    this.options = options.data;
    _.bindAll(this, "render");
    this.render();
  },

  render: function() {
    var self = this;
    $.get("/src/templates/results.hbs", function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template({
        DemoJson: self.options
      });
      self.$el.html(finalHtml);
    });
    return self;
  },

  copyLink: function() {
    console.log("link copied...");
  },

  download: function() {
    console.log("Download started...");
  },

  preview: function() {
    new App.views.PreviewModal().show();
  }
});

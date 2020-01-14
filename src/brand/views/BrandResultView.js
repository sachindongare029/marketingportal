var App = App || {};

App.views.BrandResultView = Backbone.View.extend({
  el: "#results",

  events: {
    "click #preview": "preview",
    "click #download-report": "downloadReport"
  },

  initialize: function(options) {
    this.options = options.data;
    _.bindAll(this, "render");
    this.render();
  },

  render: function() {
    var self = this;
    $.get("/src/templates/brandresults.hbs", function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template({
        DemoJson: self.options
      });
      self.$el.html(finalHtml);
    });
    return self;
  },

  preview: function() {
    new App.views.PreviewModal().show();
  },

  downloadReport: function() {
    new App.views.DownloadModal().show();
  }
});

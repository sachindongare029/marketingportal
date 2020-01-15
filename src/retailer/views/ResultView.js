var App = App || {};

App.views.ResultView = Backbone.View.extend({
  el: "#results",

  events: {
    "click #copy-link": "copyLink",
    "click #download": "download",
    "click #preview": "preview",
    "click #sort-brand": "BrandSort",
    "change .file-type": "fileTypeChange"
  },

  initialize: function(options) {
    this.options = options.data;
    var fileTypeSelected;
    $.each(this.options, function(index, ele) {
      fileTypeSelected = ele.assets[0].fileType;
    })
    this.fileTypeSelected = fileTypeSelected;
    // App.helpers.setFilters({
    //   fileType: "jpg"
    // });
    _.bindAll(this, "render");
    this.render();
  },

  render: function() {
    var self = this;
    $.get("/src/templates/results.hbs", function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template({
        tableData: self.options,
        fileType: self.fileTypeSelected
      });
      self.$el.html(finalHtml);
    });
    return self;
  },

  BrandSort: function() {
    this.options = _.sortBy(this.options, "brandId");
    this.render();
  },

  fileTypeChange: function(e) {
    var selIndex = e.target.options.selectedIndex;
    // console.log("value", e.target.options[selIndex].text);
    this.fileTypeSelected = e.target.options[selIndex].text;
    // App.helpers.setFilters({
    //   fileType: fileType
    // });
    this.render();
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

var App = App || {};

App.views.BrandView = Backbone.View.extend({
  el: "#root",

  events: {},

  initialize: function() {
    _.bindAll(this, "render");
    this.render();
  },

  render: function() {
    var self = this;
    var JSON = [
      {
        brandName: "OPT",
        assetName: "Sample Image",
        assetType: "Logo",
        fileType: "JPEG",
        specs: [
          "3242 x 2421 at 300 dpl",
          "1920 x 1080 at 72 dpl",
          "6000 x 6000 at 300 dpl"
        ],
        lastUpdated: "12/07/2017"
      },
      {
        brandName: "A.JAFFE",
        assetName: "Sample Image",
        assetType: "Logo",
        fileType: "JPEG",
        specs: [
          "3242 x 2421 at 300 dpl",
          "1920 x 1080 at 72 dpl",
          "6000 x 6000 at 300 dpl"
        ],
        lastUpdated: "12/07/2018"
      },
      {
        brandName: "Harry Kotlar",
        assetName: "Sample Image",
        assetType: "Logo",
        fileType: "JPEG",
        specs: [
          "3242 x 2421 at 300 dpl",
          "1920 x 1080 at 72 dpl",
          "6000 x 6000 at 300 dpl"
        ],
        lastUpdated: "09/07/2020"
      },
      {
        brandName: "Fred Leighton",
        assetName: "Sample Image",
        assetType: "Logo",
        fileType: "JPEG",
        specs: [
          "3242 x 2421 at 300 dpl",
          "1920 x 1080 at 72 dpl",
          "6000 x 6000 at 300 dpl"
        ],
        lastUpdated: "27/11/2080"
      }
    ];
    $.get("/src/templates/brandhome.hbs", function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template({
        parentPage: "Front Page",
        currentPage: "Marketing Portal Analytics"
      });
      self.$el.html(finalHtml);
      self.renderDescView();
      // self.renderFilterView(JSON);
      // self.renderResultView(JSON);
    });
    return self;
  },

  renderDescView: function() {
    new App.views.BrandDescView();
  },

  renderFilterView: function(JSON) {
    new App.views.FilterView({
      data: JSON
    });
  },

  renderResultView: function(JSON) {
    new App.views.ResultView({
      data: JSON
    });
  }
});

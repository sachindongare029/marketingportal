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
        assetName: "asset 1",
        assetType: "JPEG",
        assetPreviews: 2,
        assetDownloads: 7,
        retailer: 'Kwiat',
        urlCopied: 4,
        keywordsSearched: ['keyword1', 'keyword2'],
        assetRequests: 10
      },
      {
        assetName: "asset 1",
        assetType: "JPEG",
        assetPreviews: 4,
        assetDownloads: 3,
        retailer: 'Hkot',
        urlCopied: 0,
        keywordsSearched: ['keyword1', 'keyword2'],
        assetRequests: 02
      },
      {
        assetName: "asset 1",
        assetType: "JPEG",
        assetPreviews: 22,
        assetDownloads: 13,
        retailer: 'Gucchi',
        urlCopied: 9,
        keywordsSearched: ['keyword3', 'keyword4'],
        assetRequests: 3
      },
      {
        assetName: "asset 1",
        assetType: "JPEG",
        assetPreviews: 9,
        assetDownloads: 1,
        retailer: 'Kwiat',
        urlCopied: 5,
        keywordsSearched: ['keyword5', 'keyword6'],
        assetRequests: 1
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
      self.renderFilterView(JSON);
      self.renderResultView(JSON);
    });
    return self;
  },

  renderDescView: function() {
    new App.views.BrandDescView();
  },

  renderFilterView: function(JSON) {
    new App.views.BrandFilterView({
      data: JSON
    });
  },

  renderResultView: function(JSON) {
    new App.views.BrandResultView({
      data: JSON
    });
  }
});

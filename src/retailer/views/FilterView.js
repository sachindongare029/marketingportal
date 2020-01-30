var App = App || {};

App.views.FilterView = Backbone.View.extend({
  el: "#filters",

  events: {
    "change #asset-type": "assetTypeFilter",
    "change #brand-view": "brandNameFilter",
    "keydown #search-box": "keywordFilter"
  },

  initialize: function() {
    _.bindAll(this, "render");
    var filtersData = $.parseJSON(
      $.ajax({
        url: "https://optportal-node-qa.optcentral.com/node/api/mvpassets",
        dataType: "json",
        async: false
      }).responseText
    );
    this.filtersData = filtersData;
    this.render();
  },

  render: function() {
    var self = this;
    var brandNameData = this.filtersData.reduce((acc, val) => {
      acc.indexOf(val.brandName) === -1 ? acc.push(val.brandName) : acc;
      return acc;
    }, []);
    $.get("/src/templates/filters.hbs", function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template({
        brandNameData: brandNameData
      });
      self.$el.html(finalHtml);
    });
    return self;
  },

  assetTypeFilter: function() {
    var assetType = $("#asset-type").val();
    if (assetType == "all") {
      App.helpers.setFilters({
        asset_type: ''
      });
      App.eventBus.trigger("GET_PRODUCTS");
    } else {
      App.helpers.setFilters({
        asset_type: assetType
      });
      App.eventBus.trigger("GET_PRODUCTS");
    }
  },

  brandNameFilter: function() {
    var brand = $("#brand-view").val();
    if (brand == "all") {
      App.helpers.setFilters({
        brandName: ''
      });
      App.eventBus.trigger("GET_PRODUCTS");
    } else {
      App.helpers.setFilters({
        brandName: brand
      });
      App.eventBus.trigger("GET_PRODUCTS");
    }
  },

  keywordFilter: function(e) {
    var code = e.keyCode || e.which;
    if (code == 13) {
      var keyword = $("#search-box").val();
      if (!keyword) {
        App.helpers.setFilters({
          keyword: ''
        });
        App.eventBus.trigger("GET_PRODUCTS");
      } else {
        App.helpers.setFilters({
          keyword: keyword
        });
        App.eventBus.trigger("GET_PRODUCTS");
      }
    }
  }
});

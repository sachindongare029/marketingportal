var App = App || {};

App.views.HomeView = Backbone.View.extend({
  el: "#root",

  events: {},

  initialize: function() {
    _.bindAll(this, "render", "doFetch");
    this.collection = new App.collections.MarketingCollection();
    App.eventBus.on(
      "GET_PRODUCTS",
      function(filtersPassed) {
        this.doFetch(filtersPassed);
      }.bind(this)
    );

    App.eventBus.trigger("GET_PRODUCTS", "all");
  },

  doFetch: function(filtersPassed) {
    var self = this;
    var filters = App.helpers.getFilters();
    if (filtersPassed && filtersPassed == "all") {
      localStorage.removeItem("filters");
      filters = App.helpers.getFilters();
    } else if (filtersPassed && "brandName" in filtersPassed) {
      delete filters.asset_type;
      delete filters.keyword;
    } else if (filtersPassed && "asset_type" in filtersPassed) {
      delete filters.brandName;
      delete filters.keyword;
    } else if (filtersPassed && "keyword" in filtersPassed) {
      delete filters.asset_type;
      delete filters.brandName;
    }
    this.collection.fetch({ data: filters }).done(function() {
      self.render();
    });
  },

  render: function() {
    var self = this;
    $.get("/src/templates/home.hbs", function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template({
        parentPage: "Front Page",
        currentPage: "Marketing Portal"
      });
      self.$el.html(finalHtml);
      self.renderDescView();
      self.renderFilterView();
      self.renderResultView();
    });
    return self;
  },

  renderDescView: function() {
    new App.views.DescView();
  },

  renderFilterView: function() {
    new App.views.FilterView({
      data: this.collection.toJSON()
    });
  },

  renderResultView: function() {
    new App.views.ResultView({
      data: this.collection.toJSON()
    });
  }
});

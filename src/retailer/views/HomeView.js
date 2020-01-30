var App = App || {};

App.views.HomeView = Backbone.View.extend({
  el: "#home",

  events: {},

  initialize: function() {
    _.bindAll(this, "render", "doFetch");
    this.collection = new App.collections.MarketingCollection();
    App.eventBus.on(
      "GET_PRODUCTS",
      function() {
        this.doFetch();
      }.bind(this)
    );

    App.eventBus.trigger("GET_PRODUCTS");
  },

  doFetch: function() {
    var self = this;
    var filters = App.helpers.getFilters();
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
      self.renderResultView();
    });
    return self;
  },
  
  renderResultView: function() {
    new App.views.ResultView({
      data: this.collection.toJSON()
    });
  }
});

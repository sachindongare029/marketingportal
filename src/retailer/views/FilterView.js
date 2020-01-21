var App = App || {};

App.views.FilterView = Backbone.View.extend({
  el: "#filters",

  events: {
    "change #asset-type": "assetTypeFilter"
  },

  initialize: function() {
    _.bindAll(this, "render");
    var filtersData = $.parseJSON(
      $.ajax({
        url: "http://optportal-node-qa.optcentral.com/node/api/mvpassets",
        dataType: "json",
        async: false
      }).responseText
    );
    this.filtersData = filtersData;
    this.render();
  },

  render: function() {
    var self = this;
    var filters = App.helpers.getFilters();
    $.get("/src/templates/filters.hbs", function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template({
        data: self.filtersData
      });
      self.$el.html(finalHtml);
      $('#asset-type option[value="' + filters.asset_type + '"]')
        .attr("selected", "selected");
    });
    return self;
  },

  assetTypeFilter: function() {
    var assetType = $("#asset-type").val();
    if (assetType == 'all') {
      App.eventBus.trigger("GET_PRODUCTS", "all");
    } else {
      App.helpers.setFilters({
        asset_type: assetType
      });
      App.eventBus.trigger("GET_PRODUCTS", {
        asset_type: assetType
      });
    }
  }
});

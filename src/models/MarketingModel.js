var App = App || {};

App.models.MarketingModel = Backbone.Model.extend({
  url: function() {
    return "http://157.230.67.60/node/api/mvpassets?retailers=10";
  },
  defaults: {
    _id: null,
  }
});

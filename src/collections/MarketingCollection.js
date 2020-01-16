var App = App || {};

var base_url = "http://157.230.67.60/node/api/mvpassets";
App.collections.MarketingCollection = Backbone.Collection.extend({
  url: function() {
    return base_url;
  },
  model: App.models.MarketingModel,
  parse: function(response) {
    return response;
  }
});

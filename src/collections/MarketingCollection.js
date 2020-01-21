var App = App || {};

var base_url = "https://optportal-node-qa.optcentral.com/node/api/mvpassets";
App.collections.MarketingCollection = Backbone.Collection.extend({
  url: function() {
    return base_url;
  },
  model: App.models.MarketingModel,
  parse: function(response) {
    return response;
  }
});

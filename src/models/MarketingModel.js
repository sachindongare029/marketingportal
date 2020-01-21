var App = App || {};

App.models.MarketingModel = Backbone.Model.extend({
  url: function() {
    return "https://optportal-node-qa.optcentral.com/node/api/mvpassets";
  },
  defaults: {
    _id: null,
  }
});

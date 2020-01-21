var App = App || {};

App.models.MarketingModel = Backbone.Model.extend({
  url: function() {
    return "http://optportal-node-qa.optcentral.com/node/api/mvpassets";
  },
  defaults: {
    _id: null,
  }
});

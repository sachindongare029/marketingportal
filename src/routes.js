var App = App || {};

App.Router = Backbone.Router.extend({
  routes: {
    "": "homeView",
    brands: "brandView"
  },

  homeView: function() {
    new App.views.DescView();
    new App.views.FilterView();
    new App.views.HomeView();
  },

  brandView: function() {
    new App.views.BrandView();
  }
});

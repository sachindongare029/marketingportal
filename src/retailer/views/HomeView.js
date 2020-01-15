var App = App || {};

App.views.HomeView = Backbone.View.extend({
  el: "#root",

  events: {},

  initialize: function() {
    _.bindAll(this, "render");
    this.render();
  },

  render: function() {
    var self = this;
    var JSON = [
      {
        _id: "5e1ecdcc028347840bb260c7",
        name: "My getmail",
        asset_type: "Banner",
        brandId: "11",
        status: "active",
        __v: 0,
        zipFileUrl:
          "https://s3.amazonaws.com/varsha-testing/email-attachments/10_assets.zip",
        retailers: ["13", "15"],
        actions: {
          request: true,
          download: true,
          copy: true,
          preview: true
        },
        assets: [
          {
            _id: "5e1ecb1c08bb36f10a0ea14c",
            id: 18,
            brandId: "10",
            fileType: "jpg",
            optionalFileName: "s2.jpg",
            optionalFileUrl:
              "https://s3.amazonaws.com/varsha-testing/email-attachments/s2.jpg",
            url:
              "https://s3.amazonaws.com/varsha-testing/email-attachments/s1.jpg",
            name: "s1.jpg",
            __v: 0,
            spec: {
              width: 200,
              height: 400,
              resolution: "530 dpi",
              title: "spec"
            }
          },
          {
            _id: "5e1dd69b834c28622e0fca76",
            id: 17,
            brandId: "10",
            fileType: "pdf",
            optionalFileName: "s2.jpg",
            optionalFileUrl:
              "https://s3.amazonaws.com/varsha-testing/email-attachments/s2.jpg",
            url:
              "https://s3.amazonaws.com/varsha-testing/email-attachments/s1.jpg",
            name: "s1.jpg",
            __v: 0,
            spec: {
              title: "spec"
            }
          }
        ],
        keyword: ["Test2iabcsdfsdftt"]
      },
      {
        _id: "5e1ecdd5028347840bb260c8",
        name: "My dontgetmail",
        asset_type: "Banner",
        brandId: "10",
        status: "active",
        __v: 0,
        zipFileUrl:
          "https://s3.amazonaws.com/varsha-testing/email-attachments/10_assets.zip",
        retailers: ["13", "15"],
        actions: {
          request: true,
          download: true,
          copy: true,
          preview: true
        },
        assets: [
          {
            _id: "5e1dd0ab3557f2a12d39c7b7",
            id: 16,
            brandId: "10",
            fileType: "jpg",
            optionalFileName: "s2.jpg",
            optionalFileUrl:
              "https://s3.amazonaws.com/varsha-testing/email-attachments/s2.jpg",
            url:
              "https://s3.amazonaws.com/varsha-testing/email-attachments/s3.jpg",
            name: "s3.jpg",
            __v: 0,
            spec: {
              width: 300,
              height: 400,
              resolution: "530 dpi",
              title: "spec"
            }
          },
          {
            _id: "5e1dd0a13557f2a12d39c7b6",
            id: 15,
            brandId: "10",
            fileType: "jpg",
            optionalFileName: "s2.jpg",
            optionalFileUrl:
              "https://s3.amazonaws.com/varsha-testing/email-attachments/s2.jpg",
            url:
              "https://s3.amazonaws.com/varsha-testing/email-attachments/s3.jpg",
            name: "s3.jpg",
            __v: 0,
            spec: {
              width: 600,
              height: 700,
              resolution: "830 dpi",
              title: "spec"
            }
          }
        ],
        keyword: ["Test2iabcsdfsdftt"]
      }
    ];
    $.get("/src/templates/home.hbs", function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template({
        parentPage: "Front Page",
        currentPage: "Marketing Portal"
      });
      self.$el.html(finalHtml);
      self.renderDescView();
      self.renderFilterView(JSON);
      self.renderResultView(JSON);
    });
    return self;
  },

  renderDescView: function() {
    new App.views.DescView();
  },

  renderFilterView: function(JSON) {
    new App.views.FilterView({
      data: JSON
    });
  },

  renderResultView: function(JSON) {
    new App.views.ResultView({
      data: JSON
    });
  }
});

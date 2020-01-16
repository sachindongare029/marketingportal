var App = App || {};

App.views.ResultView = Backbone.View.extend({
  el: "#results",

  events: {
    "click #copy-link": "copyLink",
    "click #download": "download",
    "click #preview": "preview",
    "click #sort-brand": "BrandSort",
    "change .file-type": "fileTypeChange"
  },

  initialize: function(options) {
    this.options = options.data;
    _.bindAll(this, "render");
    this.render();
  },

  render: function() {
    var self = this;
    console.log("options", self.options);
    $.get("/src/templates/results.hbs", function(templateHtml) {
      var template = Handlebars.compile(templateHtml);
      var finalHtml = template({
        tableData: self.options
      });
      self.$el.html(finalHtml);
    });
    return self;
  },

  BrandSort: function() {
    this.options = _.sortBy(this.options, "brandId");
    this.render();
  },

  fileTypeChange: function(e) {
    var selIndex = e.target.options.selectedIndex;
    var fileType = e.target.options[selIndex].text;
    var optionsArr = [];
    var optionsObj = {};
    var result = this.options.find(obj => {
      return obj._id === e.target.id;
    });
    if (fileType == 'pdf') {
      result.assets.forEach(element => {
        optionsObj.id = element._id;
        optionsObj.resolution = element.spec.title;
        optionsArr.push(optionsObj);
        optionsObj = {};
      });
    } else {
      result.assets.forEach(element => {
        optionsObj.id = element._id;
        optionsObj.resolution = element.spec.width + " X " + element.spec.height + ' at ' + element.spec.resolution;
        optionsArr.push(optionsObj);
        optionsObj = {};
      });
    }
    var siblingNode = e.currentTarget.parentNode.nextSibling.nextElementSibling.childNodes[1];

    $(siblingNode).empty();
    optionsArr.forEach(element => {
      var option = document.createElement("option");
      option.text = element.resolution;
      option.value = element.id;
      siblingNode.add(option);
    })
    console.log("result", result);
  },

  copyLink: function() {
    console.log("link copied...");
  },

  download: function() {
    console.log("Download started...");
  },

  preview: function() {
    new App.views.PreviewModal().show();
  }
});

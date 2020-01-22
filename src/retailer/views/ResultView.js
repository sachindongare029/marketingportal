var App = App || {};

App.views.ResultView = Backbone.View.extend({
  el: "#results",

  events: {
    "click .copy-link": "copyLink",
    "click .download": "download",
    "click .preview": "preview",
    "click #sort-brand": "BrandSort",
    "change .file-type": "fileTypeChange",
    "change .img-resolution": "resolutionChanged"
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
    this.options = _.sortBy(this.options, "brandName");
    this.render();
  },

  fileTypeChange: function(e) {
    var selIndex = e.target.options.selectedIndex;
    var fileType = e.target.options[selIndex].text;
    var optionsArr = [];
    var optionsObj = {};
    var siblingNode =
      e.currentTarget.parentNode.nextSibling.nextElementSibling.childNodes[1];
    // var dateNode = $(e.currentTarget.parentNode.parentNode).find('.result-last__update')[0];
    var result = this.options.find(obj => {
      return obj._id === e.target.id;
    });
    var fileTypeArr = result.assets.filter(obj => {
      return obj.fileType == fileType;
    });
    this.fileTypeArr = fileTypeArr;

    if (fileType == "pdf") {
      fileTypeArr.forEach(element => {
        optionsObj.id = element._id;
        optionsObj.url = element.url;
        optionsObj.resolution = element.spec.title;
        optionsObj.name = element.name;
        optionsArr.push(optionsObj);
        optionsObj = {};
      });
    } else {
      fileTypeArr.forEach(element => {
        optionsObj.id = element._id;
        optionsObj.url = element.url;
        optionsObj.name = element.name;
        optionsObj.resolution =
          element.spec.width +
          " X " +
          element.spec.height +
          " at " +
          element.spec.resolution;
        optionsArr.push(optionsObj);
        optionsObj = {};
      });
    }

    $(siblingNode).empty();
    if (fileType == "Select File Type") {
      var option = document.createElement("option");
      option.text = "Select Resolution";
      option.value = "";
      option.name = "";
      siblingNode.add(option);
      // dateNode.innerHTML = '';
    } else {
      optionsArr.forEach(element => {
        var option = document.createElement("option");
        option.text = element.resolution;
        option.value = element.url;
        option.id = element.id;
        option.setAttribute('name', element.name);
        siblingNode.add(option);
      });
      // dateNode.innerHTML = new Date(fileTypeArr[0].updatedAt).toLocaleDateString("en-US");
    }
  },

  resolutionChanged: function(e) {
    // var selIndex = e.target.options.selectedIndex;
    // var resolution = e.target.options[selIndex].id;
    // var resoObj = this.fileTypeArr.find(obj => {
    //   return obj._id == resolution;
    // })
    // var siblingNode =
    //   e.currentTarget.parentNode.nextSibling.nextElementSibling;
    // siblingNode.innerHTML = new Date(resoObj.updatedAt).toLocaleDateString("en-US");
  },

  copyLink: function(e) {
    var domNode = $(e.currentTarget.parentNode.parentNode).find(
      ".img-resolution"
    )[0];
    var selIndex = domNode.options.selectedIndex;
    var value = domNode.options[selIndex].value;
    if (value) {
      var $temp = $("<input>");
      $("body").append($temp);
      $temp.val(value).select();
      document.execCommand("copy");
      $temp.remove();
      // alert("link copied...");
    } else {
      alert("Select file type");
    }
  },

  download: function() {
    console.log("Download started...");
  },

  preview: function(e) {
    var domNode = $(e.currentTarget.parentNode.parentNode).find(
      ".img-resolution"
    )[0];
    var selIndex = domNode.options.selectedIndex;
    var imgName = domNode.options[selIndex].getAttribute("name");

    // var targetValue = $(e.target).attr("data-imgUrl");
    var extension = imgName.substr(imgName.lastIndexOf(".") + 1);
    var Items =
      "<iframe src='https://docs.google.com/gview?url=https://s3.amazonaws.com/varsha-testing/email-attachments/'";
    if (!extension) {
      alert("Select file type...");
      return;
    } else {
      if (
        extension === "pdf" ||
        extension === "doc" ||
        extension === "xls" ||
        extension === "ppt"
      ) {
        Items = Items + imgName + '&embedded=true" width="500" height="500">';
      } else if (
        extension === "jpg" ||
        extension === "png" ||
        extension === "tiff" ||
        extension === "eps"
      ) {
        Items =
          "<img src=https://s3.amazonaws.com/varsha-testing/email-attachments/" +
          imgName +
          " />";
      } else if (extension === "mp4") {
        var Items =
          '<video width="600" controls><source src="' +
          Items +
          imgName +
          '" type="video/mp4">Your browser does not support HTML5 video. </video>';
      } else {
        Items =
          "<img src=https://s3.amazonaws.com/varsha-testing/email-attachments/" +
          imgName +
          " />";
      }
    }
    // new App.views.PreviewModal({Items: Items}).show();

    $("#enlarge")
      .html(Items)
      .dialog({
        modal: true,
        height: "auto",
        width: "600",
        position: ["center", 0],
        close: function() {
          $(this)
            .dialog("destroy")
            .empty();
        }
      });
    return false;
  }
});

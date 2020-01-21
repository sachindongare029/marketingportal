Handlebars.registerHelper("selectDropdownFileType", function(obj, id) {
  var fileType = obj.reduce((acc, val) => {
    acc.indexOf(val.fileType) === -1 ? acc.push(val.fileType) : acc;
    return acc;
  }, []);
  var strSelect = '<select class="file-type" id=' + id + '><option>Select File Type</option>';
  if (fileType.length === 1) {
    fileType.forEach(element => {
      strSelect = "<select class='file-type' id=" + id + "><option selected>" + element + "</option>";
    });
  } else {
    fileType.forEach(element => {
      strSelect = strSelect + "<option>" + element + "</option>";
    });
  }
  return new Handlebars.SafeString( strSelect + '</select>');
});

Handlebars.registerHelper("selectDropdownReso", function(obj) {
  var fileType = obj.reduce((acc, val) => {
    acc.indexOf(val.fileType) === -1 ? acc.push(val.fileType) : acc;
    return acc;
  }, []);
  var strSelect = "<select class='img-resolution'>";
  if (fileType.length === 1) {
    obj.forEach(el => {
      if (fileType[0] == 'pdf') {
        strSelect = strSelect + "<option value=" + el.url + ">" + el.spec.title + "</option>";
      } else {
        strSelect = strSelect + "<option value=" + el.url + ">" + el.spec.width + " X " + el.spec.height + " at " + el.spec.resolution + "</option>";
      }
    });
  } else {
    strSelect = strSelect + "<option value=''>Select Resolution</option>"
  }
  return new Handlebars.SafeString(strSelect + '</select>');
});

Handlebars.registerHelper("updatedTime", function(obj) {
  var strSelect = new Date(obj).toLocaleDateString("en-US");
  return new Handlebars.SafeString(strSelect);
});

Handlebars.registerHelper("assetTypeDropdown", function(obj) {
  var str = '<option value="' + obj + '">' + obj + '</option>';
  return new Handlebars.SafeString(str);
});

Handlebars.registerHelper("brandNameDropdown", function(obj) {
  var str = '<option value="' + obj + '">' + obj + "</option>";
  return new Handlebars.SafeString(str);
});

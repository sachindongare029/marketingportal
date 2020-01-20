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

Handlebars.registerHelper("selectDropdownReso", function(obj, id) {
  var fileType = obj.reduce((acc, val) => {
    acc.indexOf(val.fileType) === -1 ? acc.push(val.fileType) : acc;
    return acc;
  }, []);
  var strSelect = "<select class='img-resolution'>";
  if (fileType.length === 1) {
    obj.forEach(element => {
      strSelect = strSelect + "<option value=" + element.url + ">" + element.spec.title + "</option>";
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
  var value = obj.asset_type;
  var str = '<option value="' + value + '">' + value + '</option>';
  return new Handlebars.SafeString(str);
});

Handlebars.registerHelper("selectDropdownFileType", function(obj, id) {
  var fileType = obj.reduce((acc, val) => {
    acc.indexOf(val.fileType) === -1 ? acc.push(val.fileType) : acc;
    return acc;
  }, []);
  var strSelect = '<select class="file-type" id=' + id + '><option>Select File Type</option>';
  fileType.forEach(element => {
    strSelect = strSelect + "<option>" + element + "</option>";
  });
  return new Handlebars.SafeString( strSelect + '</select>');
});

Handlebars.registerHelper("selectDropdownResolution", function(obj) {
  var strSelect = "<select>";
  return new Handlebars.SafeString(strSelect + "</select>");
});

Handlebars.registerHelper("selectDropdownFileType", function(obj, type) {
  var Ftype = type.data.root.fileType;
  // console.log("Ftype", Ftype);
  var fileType = obj.reduce((acc, val) => {
    acc.indexOf(val.fileType) === -1 ? acc.push(val.fileType) : acc;
    return acc;
  }, []);
  var strSelect = '<select class="file-type">';
  fileType.forEach(element => {
    if (Ftype === element) {
      strSelect = strSelect + "<option selected>" + element + "</option>";
    } else {
      strSelect = strSelect + '<option>' + element + '</option>';
    }
  });
  return new Handlebars.SafeString( strSelect + '</select>');
});

Handlebars.registerHelper("selectDropdownResolution", function(obj, type) {
  console.log("TCL: type", type.data.root.fileType);
  var resolution = obj.reduce((acc, val) => {
  }, []);
  var strSelect = "<select>";
  // resolution.forEach(element => {
  //   strSelect = strSelect + "<option>" + element + "</option>";
  // });
  return new Handlebars.SafeString(strSelect + "</select>");
});

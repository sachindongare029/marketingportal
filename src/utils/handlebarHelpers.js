Handlebars.registerHelper("selectDropdownFileType", function(obj, type) {
  var fType = type.data.root.fileType;
  var fileType = obj.reduce((acc, val) => {
    acc.indexOf(val.fileType) === -1 ? acc.push(val.fileType) : acc;
    return acc;
  }, []);
  var strSelect = '<select class="file-type">';
  fileType.forEach(element => {
    if (fType === element) {
      strSelect = strSelect + "<option selected>" + element + "</option>";
    } else {
      strSelect = strSelect + '<option>' + element + '</option>';
    }
  });
  return new Handlebars.SafeString( strSelect + '</select>');
});

Handlebars.registerHelper("selectDropdownResolution", function(obj, type) {
  var fType = type.data.root.fileType;
  var specObj = [];
  var strSelect = "<select>";
  for (var i = 0; i < obj.length; i++) {
    if (obj[i].fileType === fType) {
      specObj.push(obj[i]);
    }
  }
  if (fType == "pdf") {
    specObj.forEach(element => {
      strSelect = strSelect + '<option>'+ element.spec.title +'</option>';
    });
  } else {
    specObj.forEach(element => {
      strSelect = strSelect + "<option>" + element.spec.width + ' X ' + element.spec.height + ' at ' + element.spec.resolution + "</option>";
    });
  }
  return new Handlebars.SafeString(strSelect + "</select>");
});

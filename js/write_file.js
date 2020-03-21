class Write_file {
  constructor () {

  }

  // write file
  onSaveDescription (data,filename,type) {
    // let filename = $('#savename_description').val()+".json";
    // let type = "json";
    let str = JSON.stringify(data);
    let file = new Blob([str], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
      let a = document.createElement("a"),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }
}

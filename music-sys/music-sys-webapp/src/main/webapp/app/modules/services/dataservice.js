app.service("myData", function() {
  var saveData = {};
  this.setData = function(data){
    saveData = data;
  }
  this.getData = function() {
    return saveData;
  }
});

app.controller("myCtrl", function($scope, $http, loadSong, myData, $state) {
  //Save data to Edit:
  $scope.edit = function(d){
    myData.setData(d);
    $state.go('edit');
  }

  // Load list song
  $scope.load = function() {
    loadSong.loadList().then(function(response) {
      $scope.ids = [];
      $scope.myData = response.data;
    });
  };

  // Delete sonng by id
  $scope.deleteSongByID = function(id) {
    swal({
      title: "Are you sure?",
      text: "You will delete this song get out your list song in MMS ?",
      icon: "warning",
      buttons: ["No, cancel it!", "Yes, I am sure!"],
      dangerMode: true
    }).then(function(isConfirm) {
      if(isConfirm){
        $http
        .delete("http://localhost:8181/cxf/music/manager/system/api/" + id)
        .then(function(){
            swal({
              title: "Success!",
              text: "The song have deleted!",
              icon: "success"
            }).then(function(response){
              console.log(response.data);
              $scope.load();
            });
          },
          function(errResponse) {
            console.log("Error: " + errResponse.status);
          }
        );
      } else{
          swal("Cancelled", "Your song do not delete!", "warning");
      }
      
    });
  };

  // Delete all sonng:
  $scope.deleteAllSong = function() {
    swal({
      title: "Are you sure?",
      text: "You will delete your list song get out MMS ?",
      icon: "warning",
      buttons: ["No, cancel it!", "Yes, I am sure!"],
      dangerMode: true
    }).then(function(isConfirm) {
      if(isConfirm){
        $http.delete("http://localhost:8181/cxf/music/manager/system/api/deleteAll")
        .then(function(){
            swal({
              title: "Success!",
              text: "Your list song have been removed!",
              icon: "success"
            }).then(function(response){
              console.log(response.data);
              $scope.load();
            });
          },
          function(errResponse) {
            console.log("Error: " + errResponse.status);
          }
        );
      } else{
          swal("Cancelled", "Your list song do not delete!", "warning");
      } 
    });
  };


});

app.controller("myCtrl", function(
  $scope,
  $stateParams,
  $http,
  addNewSong,
  loadSong
) {
  // Load list song
  $scope.load = function() {
    loadSong.loadList().then(function(response) {
      $scope.ids = [];
      $scope.myData = response.data;
    });
  };

  //Add a new song:
  // $scope.song = $stateParams.song;
  // $scope.addSong = function() {
  //   console.log($scope.fsong);
  //   // swal({
  //   //   title: "Are you sure?",
  //   //   text: "You will save the song to MMS!",
  //   //   icon: "warning",
  //   //   buttons: ["No, cancel it!", "Yes, I am sure!"],
  //   //   dangerMode: true
  //   // }).then(function(isConfirm) {
  //   //   if (isConfirm) {
  //   //     //Code excute:
  //   //     addNewSong.addSong($scope.fsong).then(
  //   //       swal({
  //   //         title: "Success!",
  //   //         text: "The song have saved!",
  //   //         icon: "success"
  //   //       }),
  //   //       function(errResponse) {
  //   //         swal("Error", "Have some Error!", "error");
  //   //         console.log(errResponse);
  //   //       }
  //   //     );
  //   //   } else {
  //   //     swal("Cancelled", "Your song not save", "error");
  //   //   }
  //   // });
  // };

  // Delete sonng by id
  $scope.deleteSongByID = function(id) {
    $http
      .delete("http://localhost:8181/cxf/music/manager/system/api/" + id)
      .then(
        function(response) {
          console.log(response.data);
          $scope.load();
        },
        function(errResponse) {
          console.log("Error while delete: " + errResponse.status);
        }
      );
  }

});

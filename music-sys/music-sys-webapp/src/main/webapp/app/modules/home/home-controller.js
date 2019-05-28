app.controller("myCtrl", function ($scope, $stateParams, $http, $window) {
// Load list song
  $scope.load = function () {
    $http.get("http://localhost:8181/cxf/mms/api").then(function (response) {
      $scope.ids = [];
      $scope.myData = response.data;
    });
  };
// Delete sonng by id
  $scope.deleteSongByID = function (id) {
    $http.delete('http://localhost:8181/cxf/mms/api/delete/' + id).then(function (response) {
      console.log(response.data);
      $scope.load();
    },
      function (errResponse) {
        console.log('Error while delete ' + errResponse.status)
      });
  };

// // Add a new song
//   $scope.song = $stateParams.song;
//   $scope.addSong = function (song) {
//       var myData = {
//           'name': song.name, 
//           'genre': song.genre
//       };
//       var post = $http({
//           method: 'POST',
//           url: 'http://localhost:8181/cxf/mms',
//           data: myData
//       });
//       post.then(function () {
//           console.log("Add Song Successful");
//           $window.alert('Add Song Successful!!');
//       }, function (errResponse) {
//           console.log("Error while add song!" + errResponse.status);
//           $window.alert('Error while add song!!');
//       });
//   };

});

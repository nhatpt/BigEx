app.controller("myCtrl", function ($scope, $stateParams, $http, $window) {
// Load list song
  $scope.load = function () {
    $http.get("http://localhost:8181/cxf/music/manager/system/api").then(function (response) {
      $scope.ids = [];
      $scope.myData = response.data;
    }, function(errResponse){
    	 console.log('Error: ', errResponse.header);
    });
  };
  
// Delete sonng by id
  $scope.deleteSongByID = function (id) {
    $http.delete('http://localhost:8181/cxf/music/manager/system/api/' + id).then(function (response) {
      console.log(response.data);
      $scope.load();
    },
      function (errResponse) {
        console.log('Error while delete ' + errResponse.status)
      });
  };
});

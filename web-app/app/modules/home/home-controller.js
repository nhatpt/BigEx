app.controller("myCtrl", function(
  $scope,
  $http,
  loadSong,
  myData,
  $state,
  $filter
) {
  // Load list song
  $scope.load = function() {
    loadSong.loadList().then(function(response) {
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
      if (isConfirm) {
        $http
          .delete("http://localhost:8181/cxf/music/manager/system/api/" + id)
          .then(
            function() {
              swal({
                title: "Success!",
                text: "The song have deleted!",
                icon: "success"
              }).then(function(response) {
                console.log(response.data);
                $scope.load();
              });
            },
            function(errResponse) {
              console.log("Error: " + errResponse.status);
            }
          );
      } else {
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
      if (isConfirm) {
        $http
          .delete(
            "http://localhost:8181/cxf/music/manager/system/api/deleteAll"
          )
          .then(
            function() {
              swal({
                title: "Success!",
                text: "Your list song have been removed!",
                icon: "success"
              }).then(function(response) {
                console.log(response.data);
                $scope.load();
              });
            },
            function(errResponse) {
              console.log("Error: " + errResponse.status);
            }
          );
      } else {
        swal("Cancelled", "Your list song do not delete!", "warning");
      }
    });
  };

  $scope.arrChecked = [];
  $scope.isCheckbox = function() {
    var arr = [];
    $scope.myData.forEach(function(user) {
      if (user.checked) {
        arr.push(user.id);
      }
    });
    $scope.arrChecked = arr;
  };

  // Delete sonng by Multi-id:
  $scope.deleteMulSong = function() {
    console.log($scope.arrChecked);
    swal({
      title: "Are you sure?",
      text: "You will delete this song get out MMS ?",
      icon: "warning",
      buttons: ["No, cancel it!", "Yes, I am sure!"],
      dangerMode: true
    }).then(function(isConfirm) {
      if (isConfirm) {
        if($scope.arrChecked != undefined) {
          for (var i = 0; i < $scope.arrChecked.length; i++) {
            $http
              .delete(
                "http://localhost:8181/cxf/music/manager/system/api/" +$scope.arrChecked[i]
              )
              .then(
                function() {
                  swal({
                    title: "Success!",
                    text: "The song have been removed!",
                    icon: "success"
                  }).then(function(response) {
                    console.log(response.data);
                    $scope.load();
                  });
                },
                function(errResponse) {
                  console.log("Error: " + errResponse.status);
                }
              );
          }
        } else{
          swal("Error", "You need to select least a song", "error");
        }   
      } else {
        swal("Cancelled", "The song do not delete!", "warning");
      }
    });
  };

  $scope.status = false;
  //Save data to Edit:
  $scope.edit = function(d) {
    for (var i = 0; i < $scope.myData.length; i++) {
      if ($scope.myData[i].checked == true && $scope.myData[i].id == d.id) {
        $scope.status = true;
      } else {
        continue;
      }
    }
    if ($scope.status) {
      myData.setData(d);
      $state.go("edit");
    } else {
      swal("Error", "Please select a song", "error");
    }
  };

  //Read file content:
  $scope.showContent = function ($fileContent) {
    $scope.content = $fileContent;
  };
  //Play a song:
  $scope.play = function(id){
    $http.get("http://localhost:8181/cxf/music/manager/system/api/get/"+ id).then(function(response) {
      $scope.psong = response.data;
      console.log($scope.psong);
    });
  }
});

app.controller("myCtrl", function(
  $scope,
  $http,
  loadSong,
  myData,
  $state,
  $mdDialog
) {

  $scope.bigTotalItems = 0;
  $scope.viewby = 5;
  $scope.curPage = 1;
  $scope.itemsPerPage = $scope.viewby;
  $scope.maxSize = 10;
  
  // Load list song with pagination
  $scope.load = function() {
    loadSong.loadList().then(function(response) {
      $scope.myData = response.data;
      $scope.bigTotalItems = response.data.length;
    })
  };
  
  $scope.changePage = function(num) {
    $scope.itemsPerPage = num;
    $scope.curPage = 1; //reset page
  };

  $scope.$watch('curPage + itemsPerPage', function() {
    $scope.begin = (($scope.curPage - 1) * $scope.itemsPerPage);
    $scope.end = $scope.begin + $scope.itemsPerPage;
  });

  // Delete sonng by id
  $scope.deleteSongByID = function(id, ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog
      .confirm()
      .title("Would you like to delete this song?")
      .textContent("You will delete this song get out your list song")
      .ariaLabel("Lucky day")
      .targetEvent(ev)
      .ok("OK!")
      .cancel("Cancel");

    $mdDialog.show(confirm).then(
      function() {
        $http.delete("../cxf/music/manager/system/api/getsong/" + id).then(
          function() {
            $mdDialog
              .show(
                $mdDialog
                  .alert()
                  .clickOutsideToClose(true)
                  .title("Notice")
                  .textContent("Success")
                  .ariaLabel("Alert Dialog")
                  .ok("OK")
                  .targetEvent(ev)
              )
              .then(function() {
                $scope.load();
              });
          },
          function(errResponse) {
            console.log("Error: " + errResponse.status);
          }
        );
      },
      function() {}
    );
  };

  // Delete all sonng:
  $scope.deleteAllSong = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog
      .confirm()
      .title("Would you like to delete your list song?")
      .textContent("You will delete ALL song get out your list song")
      .ariaLabel("Lucky day")
      .targetEvent(ev)
      .ok("OK!")
      .cancel("Cancel");

    $mdDialog.show(confirm).then(
      function() {
        $http.delete("../cxf/music/manager/system/api/getsong/deleteAll").then(
          function() {
            $mdDialog
              .show(
                $mdDialog
                  .alert()
                  .clickOutsideToClose(true)
                  .title("Notice")
                  .textContent("Success")
                  .ariaLabel("Alert Dialog")
                  .ok("OK")
                  .targetEvent(ev)
              )
              .then(function() {
                $scope.load();
              });
          },
          function(errResponse) {
            console.log("Error: " + errResponse.status);
          }
        );
      },
      function() {}
    );
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
  $scope.deleteMulSong = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog
      .confirm()
      .title("Would you like to delete this song?")
      .textContent("You will delete this song get out your list song")
      .ariaLabel("Lucky day")
      .targetEvent(ev)
      .ok("OK!")
      .cancel("Cancel");
    var count = 0;
    $mdDialog
      .show(confirm)
      .then(function() {
        console.log($scope.arrChecked )
        if ($scope.arrChecked.length != 0) {
          for (var i = 0; i < $scope.arrChecked.length; i++) {
            $http.delete(
              "../cxf/music/manager/system/api/getsong/" + $scope.arrChecked[i]
            );
            count++;
          }
        } else {
          $mdDialog.show(
            $mdDialog
              .alert()
              .clickOutsideToClose(true)
              .title("Notice")
              .textContent("You need to select least a song.")
              .ariaLabel("Alert Dialog")
              .ok("OK")
              .targetEvent(ev)
          );
        }
      })
      .then(function() {
        if (count != 0) {
          $mdDialog
            .show(
              $mdDialog
                .alert()
                .clickOutsideToClose(true)
                .title("Success")
                .textContent("You have deleted this song.")
                .ariaLabel("Alert Dialog")
                .ok("OK")
                .targetEvent(ev)
            )
            .then(function() {
              $scope.load();
            });
        }
      })
      .catch(function() {});
  };

 
  // Save data to Edit:
  $scope.edit = function(d) {
      myData.setData(d);
      myData.setStatus("home");
      $state.go("edit");
  };

  // Play a song:
  $scope.play = function(id) {
    $http
      .get("../cxf/music/manager/system/api/get/getsong/" + id)
      .then(function(response) {
        $scope.psong = response.data;
      });
  };

  // play-EditSong
  $scope.playEditSong = function(x) {
    myData.setData(x);
    myData.setStatus("home");
    $state.go("edit");
  };

  // play-DeleteSong:
  $scope.playDeleteSong = function(x, ev) {
    $scope.deleteSongByID(x, ev);
  };

   // Go to Home Clone
   $scope.goHomeClone = function() {
    $state.go("homeclone");
  };
});

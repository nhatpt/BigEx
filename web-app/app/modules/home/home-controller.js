app.controller("myCtrl", function(
  $scope,
  $http,
  loadSong,
  myData,
  $state,
  $mdDialog
) {

  $scope.bigTotalItems = 0;
  // $scope.bigTotalItems = size;
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
        $http.delete("../cxf/music/manager/system/api/" + id).then(
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
      .textContent("You will delete this song get out your list song")
      .ariaLabel("Lucky day")
      .targetEvent(ev)
      .ok("OK!")
      .cancel("Cancel");

    $mdDialog.show(confirm).then(
      function() {
        $http.delete("../cxf/music/manager/system/api/deleteAll").then(
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

  $scope.arrChecked;
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
        if ($scope.arrChecked != undefined) {
          for (var i = 0; i < $scope.arrChecked.length; i++) {
            $http.delete(
              "../cxf/music/manager/system/api/" + $scope.arrChecked[i]
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

  $scope.status = false;
  // Save data to Edit:
  $scope.edit = function(d, ev) {
    for (var i = 0; i < $scope.myData.length; i++) {
      if ($scope.myData[i].checked == true && $scope.myData[i].id == d.id) {
        $scope.status = true;
        break;
      } else {
        continue;
      }
    }
    if ($scope.status) {
      myData.setData(d);
      $state.go("edit");
    } else {
      $mdDialog.show(
        $mdDialog
          .alert()
          .clickOutsideToClose(true)
          .title("Warning")
          .textContent(
            "You need to select least a song and true song have checked."
          )
          .ariaLabel("Alert Dialog")
          .ok("OK")
          .targetEvent(ev)
      );
    }
  };

  // Play a song:
  $scope.play = function(id) {
    $http
      .get("../cxf/music/manager/system/api/get/" + id)
      .then(function(response) {
        $scope.psong = response.data;
      });
  };

  // play-EditSong
  $scope.playEditSong = function(x) {
    myData.setData(x);
    $state.go("edit");
  };

  // play-DeleteSong:
  $scope.playDeleteSong = function(x, ev) {
    $scope.deleteSongByID(x, ev);
  };
});

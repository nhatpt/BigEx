app.controller("homeCloneCtrl", function(
  $scope,
  $http,
  myData,
  $state,
  $mdDialog,
  loadSong
) {
  $scope.selected = [];
  $scope.limitOptions = [5, 10, 15, 20, 25, 50];

  $scope.query = {
    order: "name",
    limit: 5,
    page: 1
  };

  // Load list song with pagination
  $scope.load = function() {
    loadSong.loadList().then(function(response) {
      $scope.myData = response.data;
      $scope.totalItems = response.data.length;
    });
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
      .textContent("You will delete ALL song get out your list song")
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
    $mdDialog
      .show(confirm)
      .then(function() {
        console.log($scope.selected);
        if ($scope.selected.length != 0) {
          for (var i = 0; i < $scope.selected.length; i++) {
            $http.delete(
              "../cxf/music/manager/system/api/" + $scope.selected[i].id
            );
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
  $scope.edit = function(d) {
      myData.setData(d);
      $state.go("edit");
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

   // Go Home
   $scope.goHome = function(x) {
    $state.go("home");
  };
});

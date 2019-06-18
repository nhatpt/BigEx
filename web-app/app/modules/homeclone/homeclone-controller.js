app.controller("homeCloneCtrl", function(
  $scope,
  $http,
  $state,
  $mdDialog,
  $window,
  songService
) {
  $scope.selected = [];
  $scope.limitOptions = [5, 10, 15, 20, 25, 50];

  $scope.query = {
    order: "-id",
    limit: 5,
    page: 1
  };

  $scope.dataPagiSong = function(page, limit) {
    var dataPagi = songService.getListSongPagination(page, limit);
    dataPagi.then(
      function(response) {
        $scope.myData = response.data;
        $scope.selected = [];
      },
      function(errResponse) {
        console.log(errResponse.status);
      }
    );
  };

  $scope.loadFirst = function() {
    var init = songService.getCountListSong();
    init.then(
      function(response) {
        $scope.totalItemsQuery = response.data;
      },
      function(errResponse) {
        console.log(errResponse.status);
      }
    );
    $scope.dataPagiSong($scope.query.page, $scope.query.limit);
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
                $window.location.reload();
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
                $window.location.reload();
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
    var count = 0;
    $mdDialog.show(confirm).then(
      function() {
        console.log($scope.selected.length);
        if ($scope.selected.length != 0) {
          for (var i = 0; i < $scope.selected.length; i++) {
            var deleteMul = songService.deleteById($scope.selected[i].id);
            deleteMul.then(
              function(response) {
                count++;
              },
              function(errResponse) {
                console.log("Error: " + errResponse.status);
              }
            );
          }
          console.log(count);
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
      }).then(function() {
        if (count == $scope.selected.length && count != 0) {
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
            ).then(function() {
              $scope.dataPagiSong(1, $scope.query.limit);
            });
        }
      }).catch(function() {});
  };

  $scope.status = false;
  // Save data to Edit:
  $scope.edit = function(d) {
    myData.setData(d);
    myData.setStatus("homeclone");
    $state.go("edit");
  };

  // Play a song:
  $scope.play = function(id) {
    $http
      .get("../cxf/music/manager/system/api/getsong/getid/" + id)
      .then(function(response) {
        $scope.psong = response.data;
      });
  };

  // Go Home
  $scope.goHome = function(x) {
    $state.go("home");
  };
});

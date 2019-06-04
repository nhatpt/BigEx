app.controller("myCtrl", function(
  $scope,
  $http,
  loadSong,
  myData,
  $state,
  $mdDialog
) {
  //Confirm Dialog:
  $scope.status = " ";

  $scope.showConfirm = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog
      .confirm()
      .title("Would you like to delete your debt?")
      .textContent("All of the banks have agreed to forgive you your debts.")
      .ariaLabel("Lucky day")
      .targetEvent(ev)
      .ok("Please do it!")
      .cancel("Sounds like a scam");

    $mdDialog.show(confirm).then(
      function() {
        $scope.status = "You decided to get rid of your debt.";
      },
      function() {
        $scope.status = "You decided to keep your debt.";
      }
    );
  };

  // Load list song
  $scope.load = function() {
    loadSong.loadList().then(function(response) {
      $scope.myData = response.data;
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
        $http.delete("/cxf/music/manager/system/api/" + id).then(
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
      function() {
        console.log("Cancelled");
      }
    );

    // swal({
    //   title: "Are you sure?",
    //   text: "You will delete this song get out your list song in MMS ?",
    //   icon: "warning",
    //   buttons: ["No, cancel it!", "Yes, I am sure!"],
    //   dangerMode: true
    // }).then(function(isConfirm) {
    //   if (isConfirm) {
    //     $http
    //       .delete("/cxf/music/manager/system/api/" + id)
    //       .then(
    //         function() {
    //           swal({
    //             title: "Success!",
    //             text: "The song have deleted!",
    //             icon: "success"
    //           }).then(function(response) {
    //             console.log(response.data);
    //             $scope.load();
    //           });
    //         },
    //         function(errResponse) {
    //           console.log("Error: " + errResponse.status);
    //         }
    //       );
    //   } else {
    //     swal("Cancelled", "Your song do not delete!", "warning");
    //   }
    // });
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
        $http.delete("cxf/music/manager/system/api/deleteAll").then(
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
      function() {
        console.log("Cancelled");
      }
    );

    // swal({
    //   title: "Are you sure?",
    //   text: "You will delete your list song get out MMS ?",
    //   icon: "warning",
    //   buttons: ["No, cancel it!", "Yes, I am sure!"],
    //   dangerMode: true
    // }).then(function(isConfirm) {
    //   if (isConfirm) {
    //     $http
    //       .delete(
    //         "http://localhost:8181/cxf/music/manager/system/api/deleteAll"
    //       )
    //       .then(
    //         function() {
    //           swal({
    //             title: "Success!",
    //             text: "Your list song have been removed!",
    //             icon: "success"
    //           }).then(function(response) {
    //             console.log(response.data);
    //             $scope.load();
    //           });
    //         },
    //         function(errResponse) {
    //           console.log("Error: " + errResponse.status);
    //         }
    //       );
    //   } else {
    //     swal("Cancelled", "Your list song do not delete!", "warning");
    //   }
    // });
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
    console.log($scope.arrChecked);
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog
      .confirm()
      .title("Would you like to delete this song?")
      .textContent("You will delete this song get out your list song")
      .ariaLabel("Lucky day")
      .targetEvent(ev)
      .ok("OK!")
      .cancel("Cancel");

    $mdDialog.show(confirm).then(function() {
      if ($scope.arrChecked != undefined) {
        for (var i = 0; i < $scope.arrChecked.length; i++) {
          $http
            .delete("cxf/music/manager/system/api/" + $scope.arrChecked[i])
            .then(function() {
              $mdDialog.show(
                $mdDialog
                  .alert()
                  .clickOutsideToClose(true)
                  .title("Success")
                  .textContent("You have deleted this song.")
                  .ariaLabel("Alert Dialog")
                  .ok("OK")
                  .targetEvent(ev)
              );
            });
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
    });

    // swal({
    //   title: "Are you sure?",
    //   text: "You will delete this song get out MMS ?",
    //   icon: "warning",
    //   buttons: ["No, cancel it!", "Yes, I am sure!"],
    //   dangerMode: true
    // }).then(function(isConfirm) {
    //   if (isConfirm) {
    //     if ($scope.arrChecked != undefined) {
    //       for (var i = 0; i < $scope.arrChecked.length; i++) {
    //         $http
    //           .delete(
    //             "http://localhost:8181/cxf/music/manager/system/api/" +
    //               $scope.arrChecked[i]
    //           )
    //           .then(
    //             function() {
    //               swal({
    //                 title: "Success!",
    //                 text: "The song have been removed!",
    //                 icon: "success"
    //               }).then(function(response) {
    //                 console.log(response.data);
    //                 $scope.load();
    //               });
    //             },
    //             function(errResponse) {
    //               console.log("Error: " + errResponse.status);
    //             }
    //           );
    //       }
    //     } else {
    //       swal("Error", "You need to select least a song", "error");
    //     }
    //   } else {
    //     swal("Cancelled", "The song do not delete!", "warning");
    //   }
    // });
  };

  $scope.status = false;
  //Save data to Edit:
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
          .textContent("You need to select least a song and true song have checked.")
          .ariaLabel("Alert Dialog")
          .ok("OK")
          .targetEvent(ev)
      );
    }
  };

  //Play a song:
  $scope.play = function(id) {
    $http
      .get("http://localhost:8181/cxf/music/manager/system/api/get/" + id)
      .then(function(response) {
        $scope.psong = response.data;
        console.log($scope.psong);
      });
  };

  //play-EditSong
  $scope.playEditSong = function(x) {
    myData.setData(d);
    $state.go("edit");
  };
  //play-DeleteSong:
  $scope.playDeleteSong = function(x, ev) {
    $scope.deleteSongByID(x.id, ev);
  };

});

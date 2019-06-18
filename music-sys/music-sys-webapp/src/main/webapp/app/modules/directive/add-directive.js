app.directive("addForm", function($mdDialog, $rootScope, songService) {
  return {
    restrict: "AEC",
    templateUrl: "app/modules/directive/add.html",
    scope: true,
    scope: {
      idModal: "@"
    },

    link: function(scope) {
      scope.addSong = function(ev) {
        var song = scope.fsong;
        var confirm = $mdDialog
          .confirm()
          .title("Would you like to add this song?")
          .textContent("You will add this song into your list song")
          .ariaLabel("Lucky day")
          .targetEvent(ev)
          .ok("OK!")
          .cancel("Cancel");

        $mdDialog.show(confirm).then(function() {
          var myData = {
            name: song.name,
            genre: song.genre,
            lyrics: song.lyrics
          };
          var addSong = songService.addSong(JSON.stringify(myData));
          addSong.then(function(response){
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
            ).then(function() {
              $rootScope.$broadcast("reloadListSong");
              $rootScope.$broadcast("reloadPagiListSong");
            });
          },function(errResponse) {
            console.log(errResponse.status);
          }
          );
        },function(){

        });
      };
    }
  };
});
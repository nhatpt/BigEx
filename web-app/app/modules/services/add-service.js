app.service("addNewSong", function($http, $window, $mdDialog, $window) {
  this.addSong = function(song, ev) {
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

      var req = {
        method: "POST",
        url: "../cxf/music/manager/system/api/getsong/",
        data: myData
      };

      $http(req).then(function() {
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
        	  $window.location.reload();
          });
      });
    }),function() {
    };
  };
});



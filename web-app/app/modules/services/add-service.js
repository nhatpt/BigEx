app.service("addNewSong", function($http, $window) {
  this.addSong = function(song) {
    swal({
      title: "Are you sure?",
      text: "You will save the song to MMS!",
      icon: "warning",
      buttons: ["No, cancel it!", "Yes, I am sure!"],
      dangerMode: true
    }).then(function(isConfirm) {
      if (isConfirm) {
        var myData = {
          name: song.name,
          genre: song.genre
        };

        var req = {
          method: "POST",
          url: "http://localhost:8181/cxf/music/manager/system/api/",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,OPTIONS",
            "Access-Control-Allow-Headers":
              "Content-Type, Authorization, Content-Length, X-Requested-With"
          },
          data: myData
        };

        $http(req).then(
          function() {
            swal({
              title: "Success!",
              text: "The song have saved!",
              icon: "success"
            }).then(function() {
              $window.location.reload();
            });
          },
          function(errResponse) {
            swal("Error", "Have some Error!", "error").then(function(){
              console.log(errResponse);
              $window.location.reload();
            });
          }
        );
      } else {
        swal("Cancelled", "Your song not save", "warning");
      }
    });
  };
});

app.service("addNewSong", function($http) {
  delete $http.defaults.headers.common['X-Requested-With'];
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
          'name': song.name,
          'genre': song.genre
        };

        var url = "http://localhost:8181/cxf/music/manager/system/api/add";

        $http.post(url, myData).then(
            swal({
                title: "Success!",
                text: "The song have saved!",
                icon: "success"
              }),
            function(errResponse) {
                swal("Error", "Have some Error!" , "error");
                console.log(errResponse);
            }
          );
        
      } else {
        swal("Cancelled", "Your song not save", "error");
      }
    });
  };
});

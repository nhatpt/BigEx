app.service("addNewSong", function($http) {
  this.addSong = function(x, y) {
    swal({
      title: "Are you sure?",
      text: "You will save the song to MMS!",
      icon: "warning",
      buttons: ["No, cancel it!", "Yes, I am sure!"],
      dangerMode: true
    }).then(function(isConfirm) {
      if (isConfirm) {

        var myData = {
          name: x,
          genre: y
        };

        var post = $http({
          method: "POST",
          header: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, HEAD"
          },
          url: "http://localhost:8181/cxf/mms/",
          data: myData
        });
        post.then(
            swal({
                title: "Success!",
                text: "The song have saved!",
                icon: "success"
              }),
            function(errResponse) {
                swal("Error", "Have some Error!" , "error");
            }
          );
        
      } else {
        swal("Cancelled", "Your song not save", "error");
      }
    });
    //   scope.getName = null;
    //   scope.getGenre = null;
  };
});

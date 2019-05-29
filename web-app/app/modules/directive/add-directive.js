app.directive("addForm", function(addNewSong, $window) {
  return {
    restrict: "AEC",
    templateUrl: "app/modules/directive/add.html",
    scope: true,
    scope: {
      idModal: "@"
    },

    link: function(scope) { 
      scope.addSong = function(){
        var song = scope.fsong;
        console.log(song);
        addNewSong.addSong(song);
      }
    }
  };
});

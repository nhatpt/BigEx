app.directive("addForm", function(addNewSong) {
  return {
    restrict: "AEC",
    templateUrl: "app/modules/directive/add.html",
    scope: true,
    scope: {
      idModal: "@"
    },

    link: function(scope) { 
      scope.addSong = function(x){
        var song = scope.fsong;
        addNewSong.addSong(song,x);
      }
    }
  };
});

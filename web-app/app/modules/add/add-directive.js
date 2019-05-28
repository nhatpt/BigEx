app.directive("addForm", function(addNewSong) {
  return {
    restrict: "AEC",
    templateUrl: "app/modules/add/add.html",
    scope: {
      idModal: "@"
    },

    link: function(scope) {
        // var name = scope.getName;
        // var genre = scope.getGenre;
        scope.sayHi = function() {
        addNewSong.addSong("name","genre");
      };
    }
  };
});

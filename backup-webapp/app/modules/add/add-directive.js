app.directive("addForm", function(addNewSong) {
  return {
    restrict: "AEC",
    templateUrl: "app/modules/add/add.html",
    scope: {
      idModal: "@"
    },

    link: function(scope) {
        // scope.song = $stateParams.song;
        scope.sayHi = function() {
          addNewSong.addSong( scope.song);
      };
    }
  };
});

app.controller("homeCloneCtrl", function(
  $scope,
  $http,
  $state,
  $mdDialog,
  songService
) {
	
  $scope.selected = [];
  $scope.limitOptions = [5, 10, 15, 20, 25, 50];
 
  $scope.query = {
    order: "-id",
    limit: 5,
    page: 1
  };

	$scope.dataPagiSong = function(page, limit){
		var dataPagi = songService.getListSongPagination(page, limit);
		dataPagi.then(function(response){
		    $scope.myData = response.data;
		    $scope.selected = [];
		  }, function(errResponse){
			  console.log(errResponse.status);
		  }
		);
	  }
	  
	  $scope.loadFirst = function(){
		var init = songService.getCountListSong();
		init.then(function(response){
		    $scope.totalItemsQuery = response.data;
		    $scope.dataPagiSong($scope.query.page, $scope.query.limit);
	    },function(errResponse){
			  console.log(errResponse.status);
		  });
		}

	  $scope.$on('reloadPagiListSong', function(){
		  $scope.dataPagiSong(1, $scope.query.limit);
	  })
	  
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
	    	var deleteByID = songService.deleteById(id);
	    	deleteByID.then(
	          function(response) {
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
	            	  $scope.dataPagiSong(1, $scope.query.limit);
	              });
	          },function(errResponse) {
	            console.log("Error: " + errResponse.status);
	          }
	        );
	      },
	      function() {}
	    );
	  };
	  
  // Delete all sonng:
  $scope.deleteAllSong = function(ev) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog
      .confirm()
      .title("Would you like to delete your list song?")
      .textContent("You will delete ALL song get out your list song")
      .ariaLabel("Lucky day")
      .targetEvent(ev)
      .ok("OK!")
      .cancel("Cancel");

    $mdDialog.show(confirm).then(
      function() {
    	  var deleteAll = songService.deleteAll();
    	  deleteAll.then(
          function(response) {
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
            	  $scope.dataPagiSong(1, $scope.query.limit);
              });
          },function(errResponse) {
            console.log("Error: " + errResponse.status);
          }
        );
      },
      function() {}
    );
  };

//Delete sonng by Multi-id:
  $scope.deleteMulSong = function(ev) {
    var confirm = $mdDialog
      .confirm()
      .title("Would you like to delete this song?")
      .textContent("You will delete this song get out your list song")
      .ariaLabel("Lucky day")
      .targetEvent(ev)
      .ok("OK!")
      .cancel("Cancel");
    var count = 0;
    $mdDialog.show(confirm).then(function() {
        if ( $scope.selected.length != 0) {
          for (var i = 0; i <  $scope.selected.length; i++) {
        	  var deleteMul = songService.deleteById($scope.selected[i].id);
        	  deleteMul.then(function(response){
        		  count++;
        		  if(count != 0 && count == $scope.selected.length){
        			  $mdDialog
        	            .show(
        	              $mdDialog
        	                .alert()
        	                .clickOutsideToClose(true)
        	                .title("Success")
        	                .textContent("You have deleted this song.")
        	                .ariaLabel("Alert Dialog")
        	                .ok("OK")
        	                .targetEvent(ev)
        	            ).then(function() {
        	            	 $scope.dataPagiSong(1, $scope.query.limit);
        	            });
        		  }
        	  }, function(errResponse){
        		 console.log("Error: " + errResponse.status);
        	  }) 
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
      }),function() {};
  };

  // Play a song:
  $scope.play = function(id) {
	  var playSong = songService.playSong(id);
	  playSong.then(function(response) {
		  $scope.psong = response.data;
      }, function(errResponse){
    	  console.log("Error: " + errResponse.status);
      });
  };
  
  // Go to Edit Page By Modal:
  $scope.editPlaySong = function(psong) {
	  $state.go("edit", {song: psong, status:'homeclone'});
  };
  
   // Go Home
  $scope.goHome = function(x) {
	  $state.go("home");
  };
});

app.controller("myCtrl", function(
  $scope,
  songService,
  $state,
  $mdDialog
) {

  $scope.bigTotalItems = 0;
  $scope.viewby = 5;
  $scope.curPage = 1;
  $scope.itemsPerPage = $scope.viewby;
  $scope.maxSize = 10;
  
  // Load list song with pagination
  $scope.load = function() {
    songService.loadList().then(function(response) {
      $scope.myData = response.data;
      $scope.bigTotalItems = response.data.length;
    })
  };
  
  $scope.$on('reloadListSong', function(){
      $scope.load(); 
  })
  
  $scope.changePage = function(num) {
    $scope.itemsPerPage = num;
    $scope.curPage = 1; //reset page
  };

  
  $scope.$watch('curPage + itemsPerPage', function() {
    $scope.begin = (($scope.curPage - 1) * $scope.itemsPerPage);
    $scope.end = $scope.begin + $scope.itemsPerPage;
  });

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
    	  deleteAll.then(function(response) {
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
          },function(errResponse) {
            console.log("Error: " + errResponse.status);
          }
        );
      },function() {}
    );
  };

  $scope.arrChecked = [];
  $scope.isCheckbox = function() {
    var arr = [];
    $scope.myData.forEach(function(user) {
      if (user.checked) {
        arr.push(user.id);
      }
    });
    $scope.arrChecked = arr;
  };

//Delete sonng by Multi-id:
  $scope.deleteMulSong = function(ev) {
	console.log($scope.arrChecked.length);
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
        if ($scope.arrChecked.length != 0) {
          for (var i = 0; i < $scope.arrChecked.length; i++) {
        	  var deleteMul = songService.deleteById($scope.arrChecked[i]);
        	  deleteMul.then(function(response){
        		  count++;
        		  if(count != 0 && count == $scope.arrChecked.length){
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
        	            	$scope.load();
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
  
//Delete sonng by id
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
            	  $scope.load();
              });
          },function(errResponse) {
            console.log("Error: " + errResponse.status);
          }
        );
      },
      function() {}
    );
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
	    $state.go("edit", {song: psong, status: 'home'});
  };
  
   // Go to Home Clone
   $scope.goHomeClone = function() {
    $state.go("homeclone");
  };
});

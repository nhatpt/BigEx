app.controller('myEditCtrl',
		function($scope, $http, $state, myData, $mdDialog) {
			$scope.status = myData.getStatus();
			$scope.song = myData.getData();
			console.log($scope.status);			
			console.log($scope.song);
			$scope.cancel = function() {
				$state.go('home');
			}

			$scope.updateSong = function(song, ev) {
				
				if (song.name != '' && song.genre != '' && song.lyrics != '' && $scope.checked == true) {
					var data = {
						'name' : song.name,
						'genre' : song.genre,
						'lyrics' : song.lyrics
					};

					$http.put('../cxf/music/manager/system/api/getsong/' + song.id,
							JSON.stringify(data)).then(
							function(response) {
								
								if($scope.status == "home"){
									$state.go('home');
								}
								if($scope.status == "homeclone"){
									$state.go('homeclone');
								}
							},
							function(errResponse) {
								console.log("Error while update song with id:"
										+ song.id);
							});
				} else {
					$mdDialog
							.show($mdDialog.alert().clickOutsideToClose(true)
									.title("Warning").textContent(
											"Please fill out all fields.")
									.ariaLabel("Alert Dialog").ok("OK")
									.targetEvent(ev));
				}

			};
		});
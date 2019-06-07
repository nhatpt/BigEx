app.controller('myEditCtrl',
		function($scope, $http, $state, myData, $mdDialog) {
	
			$scope.song = myData.getData();
			$scope.status = myData.getStatus();
			console.log($scope.song);
			console.log($scope.status);
			$scope.cancel = function() {
				$state.go('home');
			}

			$scope.updateSong = function(song, ev) {
				console.log(song.name);
				console.log(song.genre);
				console.log(song.lyrics);
				console.log($scope.checked);
				if (song.name != '' && song.genre != '' && song.lyrics != '' && $scope.checked == true) {
					var data = {
						'name' : song.name,
						'genre' : song.genre,
						'lyrics' : song.lyrics
					};

					$http.put('../cxf/music/manager/system/api/getsong/' + song.id,
							JSON.stringify(data)).then(
							function(response) {
								$mdDialog.show($mdDialog.alert().clickOutsideToClose(true)
										.title("Notice").textContent(
												"Update Success")
										.ariaLabel("Alert Dialog").ok("OK")
										.targetEvent(ev)).then(function(response){
											if($scope.status == "home"){
												$state.go('home');
											}
											if($scope.status == "homeclone"){
												$state.go('homeclone');
											}
										});
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
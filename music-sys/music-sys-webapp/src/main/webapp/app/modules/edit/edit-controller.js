app.controller('myEditCtrl',
		function($scope, $http, $state, $mdDialog, translationService, $stateParams,songService) {
	
		$scope.song = $stateParams.song;
		$scope.status = $stateParams.status;
		console.log($stateParams.status);
		
		//Run translation if selected language changes
		$scope.translate = function() {
			translationService.getTranslation($scope, $scope.selectedLanguage);
		};
		$scope.selectedLanguage = "en";
		$scope.translate();
		
			$scope.cancel = function() {
				if($scope.status == 'home'){
					$state.go('home');
				}
				else if($scope.status == 'homeclone'){
					$state.go('homeclone');
				}else{
					$state.go('home');
				}
			};
			
			$scope.updateSong = function(song, ev) {
				if (song.name != '' && song.genre != '' && song.lyrics != '' && $scope.checked == true) {
					var data = {
						'name' : song.name,
						'genre' : song.genre,
						'lyrics' : song.lyrics
					};
					
					var updateSong = songService.updateSong(song.id,JSON.stringify(data));
					updateSong.then(function(response) {
								$mdDialog.show($mdDialog.alert().clickOutsideToClose(true)
										.title("Notice").textContent(
												"Update Success")
										.ariaLabel("Alert Dialog").ok("OK")
										.targetEvent(ev)).then(function(response){
											$scope.cancel();
										});
							},function(errResponse) {
								console.log("Error"
										+ errResponse.status);
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




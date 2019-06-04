app.controller('myEditCtrl', function ($scope, $http,$state, myData) {
    $scope.song = myData.getData();
    console.log( $scope.song);

    $scope.cancel = function(){
        $state.go('home');
    }
    
    $scope.updateSong = function (song) {
        var data = {
            'name': song.name,
            'genre': song.genre,
            'lyrics': song.lyrics
        };
        console.log(data);
        $http.put('../cxf/music/manager/system/api/' + song.id, JSON.stringify(data))
            .then(function (response) {
                console.log("Put Data Method Executed Successfully!");
                $state.go('home');
            },function (errResponse) {
                console.log("Error while update song with id:" + song.id);
        });
    };
});
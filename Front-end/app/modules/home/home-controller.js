app.controller('myCtrl', function($scope, $http) {
    $http.get("http://localhost:8181/cxf/mms")
    .then(function(response) {
        $scope.myData = response.data;
    });
});
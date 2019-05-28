app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "app/modules/home/home.html",
            controller : "myCtrl"
        })
});

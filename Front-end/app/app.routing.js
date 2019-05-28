app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: 'app/modules/home/home.html',
            controller: 'myCtrl'
        })

        .when("/edit", {
            templateUrl: 'app/modules/edit/edit.html',
            //controller: 'editCtrl',
        })

        .when("/add", {
            templateUrl: 'app/modules/add/add.html',
            //controller: 'addCtrl'
        })
});
app.config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    var home = {
        name: 'home',
        url: '/home',
        templateUrl: 'app/modules/home/home.html',
        controller: 'myCtrl'
    }

    $stateProvider.state(home);
    $urlRouterProvider.otherwise('/home');

    // $locationProvider.html5Mode(true);
    $httpProvider.defaults.withCredentials = true; // <= Added this
});
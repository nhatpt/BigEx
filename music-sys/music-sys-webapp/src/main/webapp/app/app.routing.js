app.config(function ($stateProvider, $urlRouterProvider) {
    var home = {
        name: 'home',
        url: '/home',
        templateUrl: 'app/modules/home/home.html',
        controller: 'myCtrl'
    }

    $stateProvider.state(home);
    $urlRouterProvider.otherwise('/home');

});
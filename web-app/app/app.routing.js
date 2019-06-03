app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    var home = {
        name: 'home',
        url: '/home',
        templateUrl: 'app/modules/home/home.html',
        controller: 'myCtrl'
    }

    $stateProvider.state(home);
    $urlRouterProvider.otherwise('/home');

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
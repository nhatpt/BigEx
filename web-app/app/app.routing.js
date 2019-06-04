app.config(function ($stateProvider, $urlRouterProvider) {
    var home = {
        name: 'home',
        url: '/home',
        templateUrl: 'app/modules/home/home.html',
        controller: 'myCtrl'
    }

    var edit = {
        name: 'edit',
        url: '/edit',
        templateUrl: 'app/modules/edit/edit.html',
        controller: 'myEditCtrl'
    }

    $stateProvider.state(home)
    $stateProvider.state(edit)
    $urlRouterProvider.otherwise('/home')
});
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
        params: { song: null, status: null},
        templateUrl: 'app/modules/edit/edit.html',
        controller: 'myEditCtrl'
    }

    var homeclone = {
        name: 'homeclone',
        url: '/homeclone',
        templateUrl: 'app/modules/homeclone/home-clone.html',
        controller: 'homeCloneCtrl'
    }

    $stateProvider.state(home)
    $stateProvider.state(edit)
    $stateProvider.state(homeclone)
    $urlRouterProvider.otherwise('/home')
});


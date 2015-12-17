angular.module('bmall', ['ngRoute', 'auth', 'home', 'navigation', 'bmallService'])
    .config(['$routeProvider', '$httpProvider', '$locationProvider', function ($routeProvider, $httpProvider, $locationProvider) {
        $locationProvider.html5Mode(true);

        $routeProvider.when('/', {
            templateUrl: '/home.html',
            controller: 'home'
        }).when('/login', {
            templateUrl: '/login.html',
            controller: 'navigation'
        }).otherwise('/');

        $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    }]).run(function (auth) {

    auth.init('/', '/login', '/logout');

}).controller("initCtrl", function ($rootScope, menu) {
    if($rootScope.menues==undefined) {
        menu(function (data) {
            $rootScope.menues = data._embedded.depts;
        });
    }
});

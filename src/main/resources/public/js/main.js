angular.module('bmall', ['ngRoute', 'auth','home','navigation'])
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

});
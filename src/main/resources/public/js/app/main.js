angular.module('bmall', ['ngRoute','ngAnimate'])
    .config(['$routeProvider', '$locationProvider',function ($routeProvider, $locationProvider) {
        $routeProvider.when('signon',{
            templateUrl: 'login-page.html',
            controller: 'loginCtrl',
            controllerAs: 'login'
        });
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]).controller('MainCtrl', ['$route', '$routeParams', '$location',
    function ($route, $routeParams, $location) {
        this.$route = $route;
        this.$location = $location;
        this.$routeParams = $routeParams;
    }]).controller('loginCtrl', ['$routeParams', function ($routeParams) {
    this.name = "login";
    this.params = $routeParams;
}]);
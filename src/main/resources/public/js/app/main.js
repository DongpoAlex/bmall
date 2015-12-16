angular.module('bmall', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.when('/a/login', {
            templateUrl: 'login-page.html',
            controller: 'LoginCtrl',
            controllerAs: 'login'
        });
        $locationProvider.html5Mode(true);
    }]).controller('MainCtrl', ['$route', '$routeParams', '$location',
    function ($route, $routeParams, $location) {
        this.$route = $route;
        this.$location = $location;
        this.$routeParams = $routeParams;
    }]).controller('LoginCtrl', ['$routeParams', function ($routeParams) {
    this.name = "login";
    this.params = $routeParams;
}]);
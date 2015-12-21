angular.module('bmall', ['ngRoute', 'auth', 'home', 'navigation', 'bmallService'])
    .config(['$routeProvider', '$httpProvider', '$locationProvider',
        function ($routeProvider, $httpProvider, $locationProvider) {
            $locationProvider.html5Mode(true);

            $routeProvider.when('/', {
                templateUrl: '/home.html',
                controller: 'home'
            }).when('/goods/:id',{
                templateUrl: '/item.html',
                controller: 'goods'
            }).when('/login', {
                templateUrl: '/login.html',
                controller: 'navigation'
            }).when('/shopping', {}).otherwise('/');

            $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        }
    ]).run(function (auth) {

        auth.init('/', '/login', '/logout');

    }
).controller("initCtrl", ['$rootScope', 'menuService', 'cartService',
    function ($rootScope, menuService, cartService) {
        menuService.get(function (data) {
            $rootScope.menus = data._embedded.depts;
        });
        $rootScope.removeGoods=cartService.remove;
    }
]).controller('goods',['$scope',function($scope){

}]);

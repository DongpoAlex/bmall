angular.module('bMall', ['ngRoute', 'auth', 'home', 'navigation', 'bMallService'])
    .config(['$routeProvider', '$httpProvider', '$locationProvider',
        function ($routeProvider, $httpProvider, $locationProvider) {
            $locationProvider.html5Mode(true);

            $routeProvider.when('/app/', {
                templateUrl: '/app/home.html',
                controller: 'home'
            }).when('/app/home', {
                templateUrl: '/home.html',
                controller: 'home'
            }).when('/app/home/:id', {
                templateUrl: '/app/home.html',
                controller: 'home'
            }).when('/app/goods/:id', {
                templateUrl: '/app/item.html',
                controller: 'goodsCtrl'
            }).when('/app/login', {
                templateUrl: '/app/login.html',
                controller: 'navigation'
            }).when('/app/shopping', {
                templateUrl: '/app/shopping-cart.html'
            }).otherwise('/app');

            $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        }
    ]).run(function (auth) {
        auth.init('/app', '/app/login', '/app/logout');
    }
).directive('loading', ['$http', function ($http) {
    return {
        link: function (scope, elm, attrs) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };
            scope.$watch(scope.isLoading, function (v) {
                if (v) {
                    $(elm).modal('show');
                } else {
                    $(elm).modal('hide');
                }
            });
        }
    };
}]).controller("initCtrl", ['$rootScope', 'cartService', '$scope',
    function ($rootScope, cartService) {

        $rootScope.removeGoods = cartService.remove;
        $rootScope.getTotal = cartService.getTotal;
        $rootScope.putPurchase = cartService.putPurchase;

    }]).controller('goodsCtrl', ['$scope', '$http', '$routeParams', 'cartService', 'goodsService', 'filterFilter', '$rootScope',
    function ($scope, $http, $routeParams, cartService) {
        var params = $routeParams.id;
        $scope.goods = [];
        $http.get('/api/goods/' + params).success(function (data) {
            $scope.goods = data;
        });

        $scope.addCart = cartService.set;

    }]);

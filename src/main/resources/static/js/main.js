angular.module('bMall', ['ngRoute', 'auth', 'home', 'navigation', 'bMallService'])
    .config(['$routeProvider', '$httpProvider', '$locationProvider',
        function ($routeProvider, $httpProvider, $locationProvider) {
            $locationProvider.html5Mode(true);

            $routeProvider.when('/', {
                templateUrl: '/home.html',
                controller: 'home'
            }).when('/home', {
                templateUrl: '/home.html',
                controller: 'home'
            }).when('/home/:id', {
                templateUrl: '/home.html',
                controller: 'home'
            }).when('/goods/:id', {
                templateUrl: '/item.html',
                controller: 'goodsCtrl'
            }).when('/login', {
                templateUrl: '/login.html',
                controller: 'navigation'
            }).when('/shopping', {
                templateUrl: '/shopping-cart.html'
            }).when('/about', {
                templateUrl: '/about.html'
            }).when('/m_shopping',{
                templateUrl: '/m_shopping-cart.html'
            }).otherwise('/');

            $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        }
    ]).run(function (auth) {
        auth.init('/', '/login', '/logout');
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
                    hideLeftNav();
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

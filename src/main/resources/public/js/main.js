angular.module('bMall', ['ngRoute', 'auth', 'home', 'navigation', 'bMallService'])
    .config(['$routeProvider', '$httpProvider', '$locationProvider',
        function ($routeProvider, $httpProvider, $locationProvider) {
            $locationProvider.html5Mode(true);

            $routeProvider.when('/', {
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
            }).otherwise('/');

            $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        }
    ]).run(function (auth) {
        auth.init('/', '/login', '/logout');
    }
).directive('loading', ['$http', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };
            scope.$watch(scope.isLoading, function (v) {
                if (v) {
                    elm.show();
                } else {
                    elm.hide();
                }
            });
        }
    };
}]).controller("initCtrl", ['$rootScope', 'menuService', 'cartService',
    function ($rootScope, menuService, cartService) {

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

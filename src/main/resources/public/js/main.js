angular.module('bmall', ['ngRoute', 'auth', 'home', 'navigation', 'bmallService'])
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
                templateUrl: '/shopping-cart.html',
                controller: 'initCtrl'
            }).otherwise('/');

            $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        }
    ]).run(function (auth) {

        auth.init('/', '/login', '/logout');

    }
).controller("initCtrl", ['$rootScope', 'menuService', 'cartService',
    function ($rootScope, menuService, cartService) {

        $rootScope.removeGoods = cartService.remove;
        $rootScope.claerCart = cartService.clearCart;
        $rootScope.getToltal = cartService.getToltal;

    }
]).controller('goodsCtrl', ['$scope', '$http', '$routeParams', 'cartService','goodsService','filterFilter','$rootScope',
    function ($scope, $http, $routeParams, cartService,goodsService,filterFilter,$rootScope) {
    var params = $routeParams.id;
    $scope.goods = [];
    $http.get('/api/goods/' + params).success(function (data) {
        $scope.goods = data;
        var priceItem = filterFilter($rootScope.prices, {
            guestId: $rootScope.user.name,
            goodsId: params
        }, true);
        if(priceItem.price){
            $scope.goods.price = priceItem.price;
        }else{
            $scope.goods.price=0;
        }
    });

    $scope.addCart = function (goods) {
        cartService.set(goods);
    };

}]);

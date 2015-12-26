angular.module('home', ['bMallService']).controller('home', ['$rootScope', '$scope', 'menuService', 'goodsService',
    '$http', 'cartService',
    function ($rootScope, $scope, menuService, goodsService, $http, cartService) {

        $scope.pageNext = goodsService.pageNext;

        $scope.addCart = cartService.set;


    }
]);

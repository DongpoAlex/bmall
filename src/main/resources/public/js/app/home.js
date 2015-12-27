angular.module('home', ['bMallService']).controller('home', ['$rootScope', '$scope', 'menuService', 'goodsService',
    '$http', 'cartService',
    function ($rootScope, $scope, menuService, goodsService, $http, cartService) {

        goodsService.initGoodses('api/goods/search/byGuest?guestId=' + $rootScope.user.name + '&size=20');

        $scope.pageNext = goodsService.pageNext;

        $scope.addCart = cartService.set;


    }
]);

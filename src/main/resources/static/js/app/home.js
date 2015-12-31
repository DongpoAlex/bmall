angular.module('home', ['bMallService']).controller('home', ['$rootScope', '$scope', 'goodsService',
    '$http', 'cartService',
    function ($rootScope, $scope, goodsService, $http, cartService) {

        goodsService.init('api/goods/search/byGuest?guestId=' + $rootScope.user.name + '&size=21');

        $scope.findByDept = function (id) {
            goodsService.init('api/goods/search/byDeptId?deptId='+id+'&guestId=' + $rootScope.user.name + '&size=21');
        };

        $scope.pageNext = goodsService.pageNext;

        $scope.addCart = cartService.set;


    }
]);

angular.module('home', ['bMallService']).controller('home', ['$rootScope', '$scope', 'goodsService',
    '$http', 'cartService','$routeParams',
    function ($rootScope, $scope, goodsService, $http, cartService,$routeParams) {

        goodsService.init('api/goods/search/byGuest?guestId=' + $rootScope.user.name + '&size=21');

        function findByDept(id) {
            goodsService.init('api/goods/search/byDeptId?deptId='+id+'&guestId=' + $rootScope.user.name + '&size=21');
        };

        if($routeParams.length>0){
            findByDept($routeParams.id);
        }


        $scope.findByDept =findByDept;

        $scope.pageNext = goodsService.pageNext;

        $scope.addCart = cartService.set;


    }
]);

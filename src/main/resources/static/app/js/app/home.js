angular.module('home', ['bMallService']).controller('home', ['$rootScope', '$scope', 'goodsService',
    '$http', 'cartService', '$routeParams',
    function ($rootScope, $scope, goodsService, $http, cartService, $routeParams) {

        function findByDept(id) {
            goodsService.init('api/goods/search/byDeptId?deptId=' + id + '&guestId=' + $rootScope.user.name + '&size=21');
        };

        function findByName(name) {
            goodsService.init('api/goods/search/byName?name=' + name + '&guestId=' + $rootScope.user.name + '&size=21');

        };


        if ($routeParams.id) {
            findByDept($routeParams.id);
        } else if ($routeParams.name) {
            findByName($routeParams.name);
        } else {
            goodsService.init('api/goods/search/byGuest?guestId=' + $rootScope.user.name + '&size=21');
        }


        $scope.findByDept = findByDept;

        $scope.pageNext = goodsService.pageNext;

        $scope.addCart = cartService.set;


    }
]);

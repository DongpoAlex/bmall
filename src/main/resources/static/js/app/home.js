angular.module('home', ['bMallService']).controller('home', ['$rootScope', '$scope', 'goodsService',
    '$http', 'cartService', '$routeParams',
    function ($rootScope, $scope, goodsService, $http, cartService, $routeParams) {

        function findByDept(id) {
            goodsService.init('api/goods/search/byDeptId?deptId=' + id + '&guestId=' + $rootScope.user.name + '&size=9');
        };

        function findByName(name) {
            goodsService.init('api/goods/search/byName?name=' + encodeURI(name) + '&guestId=' + $rootScope.user.name + '&size=9');

        };


        if ($routeParams.id) {
            findByDept($routeParams.id);
        } else if ($routeParams.name) {
            findByName($routeParams.name);
        } else {
            goodsService.init('api/goods/search/byGuest?guestId=' + $rootScope.user.name + '&size=9');
        }


        $scope.findByDept = findByDept;

        $scope.pageNext = goodsService.pageNext;

        $scope.addCart = cartService.set;


    }
]);

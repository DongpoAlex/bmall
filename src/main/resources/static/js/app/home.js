angular.module('home', ['bMallService']).controller('home', ['$rootScope', '$scope', 'goodsService',
    '$http', 'cartService', '$routeParams','favoritesService',
    function ($rootScope, $scope, goodsService, $http, cartService, $routeParams,favoritesService) {

        function findByDept(id) {
            goodsService.init('api/goods/search/byDeptId?deptId=' + id + '&guestId=' + $rootScope.user.name + '&size=30');
        };

        function findByName(name) {
            goodsService.init('api/goods/search/byName?name=' + encodeURI(name) + '&guestId=' + $rootScope.user.name + '&size=30');

        };


        if ($routeParams.id) {
            findByDept($routeParams.id);
        } else if ($routeParams.name) {
            findByName($routeParams.name);
        } else {
            goodsService.init('api/goods/search/byGuest?guestId=' + $rootScope.user.name + '&size=30');
        }


        $scope.findByDept = findByDept;

        $scope.pageNext = goodsService.pageNext;

        $scope.addCart = function(goods){
            goods.qty=0;
            cartService.set(goods);
        };

        $scope.addFavorites=function(goods){
            favoritesService.postGoods(goods);
            Messenger().post({
                message: '商品 ' + goods.name + '收藏成功!',
                type: 'success',
                showCloseButton: true,
                phrase: 'Retrying TIME',
                auto: true,
                delay: 3,
                actions: false
            });
        }

        $scope.deleteFavorites=favoritesService.deleteGoods;
    }
]).controller('favoritesCtrl', ['$scope', 'favoritesService', '$rootScope','cartService',
    function ($scope, favoritesService, $rootScope,cartService) {
        var init= function(){
            favoritesService.initFavorites('api/favoritesGoods/search/byFavorited?guestId='+ $rootScope.user.name + '&size=50');
        };

        init();

        $scope.addCart = function(goods){
            cartService.set(goods);
            favoritesService.postGoods(goods);
        };

        $scope.pageNext = function(url){
            favoritesService.initFavorites(url)
            $(document).scrollTop(100);
        };

        $scope.deleteFavorites=function(goods){
            favoritesService.deleteGoods(goods);
            init();
        };
    }
]);

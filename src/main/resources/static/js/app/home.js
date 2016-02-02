angular.module('home', ['bMallService']).controller('home', ['$rootScope', '$scope', 'goodsService',
    '$http', 'cartService', '$routeParams', 'favoritesService',
    function ($rootScope, $scope, goodsService, $http, cartService, $routeParams, favoritesService) {

        function findByDept(id) {
            goodsService.init('api/goods/search/byDeptId?deptId=' + id + '&guestId=' + $rootScope.user.name + '&size=60');
        };

        function findByName(name) {
            goodsService.init('api/goods/search/byName?name=' + encodeURI(name) + '&guestId=' + $rootScope.user.name + '&size=60');

        };


        if ($routeParams.id) {
            findByDept($routeParams.id);
        } else if ($routeParams.name) {
            findByName($routeParams.name);
        } else {
            goodsService.init('api/goods/search/byGuest?guestId=' + $rootScope.user.name + '&size=60');
        }


        $scope.findByDept = findByDept;

        $scope.pageNext = goodsService.pageNext;

        $scope.addCart = cartService.set;


        $scope.addFavorites = function (goods) {
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

        $scope.deleteFavorites = favoritesService.deleteGoods;
    }
]).controller('favoritesCtrl', ['$scope', 'favoritesService', '$rootScope', 'cartService',
    function ($scope, favoritesService, $rootScope, cartService) {
        var init = function () {
            favoritesService.initFavorites('api/favoritesGoods/search/byFavorited?guestId='+$rootScope.user.name +'&size=50');
        };

        init();

        $scope.favoritesAddCart = cartService.set;

        $scope.favoritesPageNext = function (url) {
            favoritesService.initFavorites(url)
            $(document).scrollTop(100);
        };

        $scope.deleteFavorites = function (goods) {
            favoritesService.deleteGoods(goods);
            init();
        };
    }
]);

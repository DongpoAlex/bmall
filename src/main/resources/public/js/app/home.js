angular.module('home', ['bmallService']).controller('home', ['$rootScope', '$scope', 'menuService',
    'goodsService', '$http', 'cartService',
    function ($rootScope, $scope, menuService, goodsService, $http, cartService) {
        goodsService.get(function (data) {
                $scope.goodses = data;
            }
        );

        $scope.pageNext = function (url) {
            $http.get(url).success(
                function (data) {
                    $scope.goodses = data;
                }
            );
        };

        $scope.addCart = function (goods) {
            cartService.set(goods);
        };

    }
]);

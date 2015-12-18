angular.module('home', ['bmallService']).controller('home', ['$scope', 'menuService',
    function ($scope, menuService) {
        menuService.get(function(data){
            $scope.menus = data._embedded.depts;
        });

    }]);

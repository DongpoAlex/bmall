angular.module('home', ['bmallService']).controller('home', function($scope, $http,menu) {
    $http.get('/user/').success(function(data) {
        $scope.menues=[];
        menu(function(data){
            $scope.menues = data._embedded.depts;
        });
        $scope.user = data.name;
    });
});
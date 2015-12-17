angular.module('home', ['bmallService']).controller('home', function($rootScope, $http,menu) {
    $http.get('/user/').success(function(data) {
        if($rootScope.menues==undefined){
            menu(function (data) {
                $rootScope.menues = data._embedded.depts;
            });
        }
        $rootScope.user = data.name;
    });
});

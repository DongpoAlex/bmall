angular.module('bmallService', [])
    .factory('menu', ['$http', function ($http) {
        return function(fnc){
            $http.get('/api/dept').success(
            fnc
            );
        }
    }]);
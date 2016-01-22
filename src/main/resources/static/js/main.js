angular.module('bMall', ['ngRoute', 'auth', 'home', 'navigation', 'bMallService'])
    .config(['$routeProvider', '$httpProvider', '$locationProvider',
        function ($routeProvider, $httpProvider, $locationProvider) {
            $locationProvider.html5Mode(true);

            $routeProvider.when('/', {
                templateUrl: '/home.html',
                controller: 'home'
            }).when('/home', {
                templateUrl: '/home.html',
                controller: 'home'
            }).when('/home/:id', {
                templateUrl: '/home.html',
                controller: 'home'
            }).when('/goods/:id', {
                templateUrl: '/item.html',
                controller: 'goodsCtrl'
            }).when('/login', {
                templateUrl: '/login.html',
                controller: 'navigation'
            }).when('/shopping', {
                templateUrl: '/shopping-cart.html'
            }).when('/shoppingnull', {
                templateUrl: '/shopping-cart-null.html'
            }).when('/about', {
                templateUrl: '/about.html'
            }).when('/register', {
                templateUrl: '/reg-page.html',
                controller: 'accountCtrl'
            }).when('/changepwd', {
                templateUrl: '/change-password.html',
                controller: 'accountCtrl'
            }).otherwise('/login');

            $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        }
    ]).run(function (auth) {
        auth.init('/', '/login', '/logout');
    }
).directive('loading', ['$http', function ($http) {
    return {
        link: function (scope, elm, attrs) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };
            scope.$watch(scope.isLoading, function (v) {
                if (v) {
                    $(elm).modal('show');
                } else {
                    $(elm).modal('hide');
                    hideLeftNav();
                }
            });
        }
    };
}]).controller("initCtrl", ['$rootScope', 'cartService', 'AlertService',
    function ($rootScope, cartService, AlertService) {

        $rootScope.removeGoods = cartService.remove;
        $rootScope.getTotal = cartService.getTotal;
        $rootScope.putPurchase = function () {
            AlertService.post('确认提交订单吗！', {
                label: '确认提交',
                action: function () {
                    cartService.putPurchase;
                }
            }, {
                label: '取消提交', action: function () {
                    this.update({
                        type: "success",
                        message: "订单已取消！",
                        actions: false
                    });
                }
            });
        };

    }]).controller('goodsCtrl', ['$scope', '$http', '$routeParams', 'cartService',
    function ($scope, $http, $routeParams, cartService) {
        var params = $routeParams.id;
        $scope.goods = [];
        $http.get('/api/goods/' + params).success(function (data) {
            $scope.goods = data;
        });

        $scope.addCart = cartService.set;

    }
]).controller('accountCtrl', ['$scope', '$http', '$location','AlertService',
    function ($scope, $http, $location,AlertService) {
    $scope.pwdModel = {
        oldPwd: '',
        newPwd: '',
        conPwd: ''
    };
    $scope.changePwd = function () {
        if ($scope.pwdModel.newPwd === $scope.pwdModel.conPwd) {
            $http.post('/api/changePassword', $.param($scope.pwdModel), {
                headers: {
                    "content-type": "application/x-www-form-urlencoded"
                }
            }).success(function (data) {
                if (data.id == 'LE500') {
                    $scope.error = true;
                    $scope.errorMessage = data.content;
                } else if (data.id == 'LE501') {
                    $scope.error = true;
                    $scope.errorMessage = data;
                }else if(data.id=='LE200'){
                    AlertService.post(data.content+' 请重新登陆!');
                    $location.path("/login");
                }
            }).error(function (data) {
                $scope.error = true;
                $scope.errorMessage = data;
            });
        }else{
            $scope.error = true;
            $scope.errorMessage = {content:'新密码和确认密码不相同，请重试！'};
        }
    };
    $scope.cancelPwd=function(){
        $location.path("/");
    }
}
]);

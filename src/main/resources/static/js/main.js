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
            }).when('/m_shopping', {
                templateUrl: '/m_shopping-cart.html'
            }).when('/about', {
                templateUrl: '/about.html'
            }).when('/register', {
                templateUrl: '/reg-page.html',
                controller: 'accountCtrl'
            }).when('/register/success', {
                templateUrl: '/reg-success.html'
            }).when('/changepwd', {
                templateUrl: '/change-password.html',
                controller: 'accountCtrl'
            }).when('/changepwd/success', {
                templateUrl: '/change-success.html'
            }).when('/favorites', {
                templateUrl: '/favorites.html',
                controller: 'favoritesCtrl'
            });

            $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        }
    ]).run(function (auth) {
        auth.init('/', '/login', '/logout', '/register');
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
                    hideLeftNav();
                } else {
                    $(elm).modal('hide');
                    hideLeftNav();
                }
            });
        }
    };
}]).directive('initTouchspin', function () {
    function link(scope, element, attrs) {
        jQuery(element).TouchSpin({
            verticalbuttons: true,
            verticalupclass: 'glyphicon glyphicon-chevron-up',
            verticaldownclass: 'glyphicon glyphicon-chevron-down',
            max: 99999,
            initval: 1
        });

    };
    return {
        link: link
    };
}).directive('initTouchspinHome', function () {
    function link(scope, element, attrs) {
        jQuery(element).TouchSpin({
            initval: 0,
            max: 9999
        });

    };
    return {
        link: link
    };
}).directive('handleSidebarMenu', function () {
        function link(scope, element, attrs) {
            var em = $(element);
            em.click(function () {
                if (em.hasClass("collapsed") == false) {
                    em.addClass("collapsed");
                    em.siblings(".dropdown-menu").slideDown(300);
                } else {
                    em.removeClass("collapsed");
                    em.siblings(".dropdown-menu").slideUp(300);
                }
            });
        };

        return {
            link: link
        };
    }
).factory('AlertService', function () {
    Messenger.options = {
        extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
        theme: 'future'
    };
    return {
        post: function (msg, retry, cancel) {
            Messenger().post({
                type: 'info',
                message: msg,
                actions: {
                    retry: retry,
                    cancel: cancel
                }
            });
        }
    };
}).controller("initCtrl", ['$rootScope', 'cartService', 'AlertService',
    function ($rootScope, cartService, AlertService) {

        $rootScope.removeGoods = cartService.remove;
        $rootScope.getTotal = cartService.getTotal;
        $rootScope.putPurchase = function () {
            AlertService.post('确认提交订单吗！', {
                label: '确认提交',
                action: function () {
                   var re= cartService.putPurchase();
                    if(re > -1) {
                        this.update({
                            type: "success",
                            message: "提交成功，已提交后台处理!",
                            actions: false
                        });
                    }else{
                        this.update({
                            type: "success",
                            message: "提交失败，原因订单金额小于100或者商品为空！",
                            actions: false
                        });
                    }
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
]).controller('accountCtrl', ['$scope', '$http', '$location', 'AlertService', 'customerService', 'auth',
    function ($scope, $http, $location, AlertService, customerService, auth) {
        $scope.pwdModel = {
            oldPwd: '',
            newPwd: '',
            conPwd: ''
        };
        $scope.regModel = {name: '', phone: '', email: '', address: ''};

        $scope.register = function () {
            customerService.postctm($scope.regModel);
            AlertService.post('注册信息已经提交后台！');
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
                    } else if (data.id == 'LE200') {
                        AlertService.post(data.content + ' 请重新登陆!');
                        auth.clear();
                        $location.path("/changepwd/success");
                    }
                }).error(function (data) {
                    $scope.error = true;
                    $scope.errorMessage = data;
                });
            } else {
                $scope.error = true;
                $scope.errorMessage = {content: '新密码和确认密码不相同，请重试！'};
            }
        };
    }
]);

angular.module('auth', ['bMallService']).factory('auth', function ($rootScope, $http, $location, cartService, menuService) {

    enter = function () {
        if ($location.path() != auth.loginPath) {
            auth.path = $location.path();
            if (!auth.authenticated) {
                if (auth.path == auth.registerPath) {
                    $location.path(auth.registerPath);
                } else if (auth.path == auth.registerPath + '/success') {
                    $location.path(auth.registerPath + "/success");
                } else if (auth.path == '/changepwd/success') {
                    $location.path('/changepwd/success');
                } else {
                    $location.path(auth.loginPath);
                }
            }
        }
    }

    var auth = {

        authenticated: false,

        registerPath: '/register',
        loginPath: '/login',
        logoutPath: '/logout',
        homePath: '/',
        path: $location.path(),

        authenticate: function (credentials, callback) {

            var headers = credentials && credentials.username ? {
                authorization: "Basic "
                + btoa(credentials.username + ":"
                    + credentials.password)
            } : {};

            $http.get('api/user', {
                headers: headers
            }).success(function (data) {
                if (data.name) {
                    auth.authenticated = true;
                    $rootScope.user = data;
                    $http.get('api/customerDisplay/' + data.name).success(function (data) {
                        $rootScope.user.customer = data;
                        //服务加载
                        menuService.init();
                        cartService.initCart();
                    });
                    $location.path('/');
                } else {
                    auth.authenticated = false;
                }
                callback && callback(auth.authenticated);

                $location.path(auth.path == auth.loginPath ? auth.homePath : auth.path);
            }).error(function () {
                auth.authenticated = false;
                callback && callback(false);
            });

        },

        clear: function () {
            $location.path(auth.loginPath);
            auth.authenticated = false;
            $rootScope.menus = [];
            $rootScope.user = [];
            $rootScope.cart = [];
            $rootScope.purchase = [];
            $http.post(auth.logoutPath, {}).success(function () {
                console.log("Logout succeeded");
            }).error(function (data) {
                console.log("Logout failed");
            });
        },

        init: function (homePath, loginPath, logoutPath, registerPath) {

            auth.homePath = homePath;
            auth.loginPath = loginPath;
            auth.logoutPath = logoutPath;
            auth.registerPath = registerPath;
            auth.authenticate({}, function (authenticated) {
                if (authenticated) {
                    $location.path(auth.path);
                }
            })
            // Guard route changes and switch to login page if unauthenticated
            $rootScope.$on('$routeChangeStart', function () {
                enter();
            });

        }

    };

    return auth;

});

angular.module('bMallService', ['ngResource', 'ngCookies'])
    .factory('superCache', ['$cacheFactory', function ($cacheFactory) {
        return $cacheFactory('super-cache');
    }])
    .factory('menuService', function ($rootScope, $resource, superCache) {
        $rootScope.menus = [];
        if (superCache.get('menus')) {
            $rootScope.menus = superCache.get("menus");
        } else {
            var p = $resource('/api/dept/');
            p.get(function (data) {

                $rootScope.menus = data._embedded.depts;

                superCache.put("menus", $rootScope.menus);
            });
        }
        return $rootScope.menus;
    }).factory('goodsService', function ($rootScope, $resource, filterFilter) {

    $rootScope.goodses = [];

    var initGoodses = function (url) {
        var Goods = $resource(url);
        Goods.get(function (data) {
            $rootScope.goodses = data;
        });

    };

    initGoodses('api/goods/search/byGuest?guestId=' + $rootScope.user.name + '&size=9');


    return {
        get: function (id) {
            return filterFilter($rootScope.goodses, {goodsId: id}, true);
        },
        pageNext: function (url) {
            initGoodses(url);
        }
    }

}).factory('cartService', function ($rootScope, $cookieStore, $location, $resource, $window) {

    var initCart = function () {
        var CreditCart = $resource('/api/guestCart/search/byGuest?guestId=' + $rootScope.user.name);
        CreditCart.get(function (data) {
            $rootScope.cart = data._embedded.guestCarts;
            angular.forEach($rootScope.cart, function (value) {
                var CreditGoods = $resource('api/goods/search/byGoodsId?goodsId=' + value.goodsId + '&guestId=' + $rootScope.user.name);
                CreditGoods.get(function (goods) {
                    value.qty = 1;
                    value.name = goods.name;
                    value.price = goods.price;
                });
            });
        });
    };


    return {
        initCart:initCart,

        set: function (goods) {

            goods.qty = 1;
            var index = -1;

            angular.forEach($rootScope.cart, function (value, key) {
                    if (value.goodsId == goods.goodsId) {
                        index = key;
                        value.qty = value.qty + 1;
                    }
                }
            );
            if (index === -1) {
                $rootScope.cart.push(goods);
            }

            $cookieStore.remove('cart');
            $cookieStore.put('cart', $rootScope.cart);


        },
        remove: function (index) {
            $rootScope.cart.splice(index, 1);
            $cookieStore.put('cart', $rootScope.cart);
            if ($rootScope.$root.$$phase != '$apply' && $rootScope.$root.$$phase != '$digest') {
                $rootScope.$apply();
            }
        },
        getTotal: function () {
            var total = 0;
            angular.forEach($rootScope.cart, function (value) {
                total = total + value.price * value.qty;
            });
            return total;
        },
        putPurchase: function () {
            var sheetId = moment().format("YYYYMMDDHHmmsss");

            angular.forEach($rootScope.cart, function (value) {
                value.sheetId = sheetId;
                value.sumPrice = value.qty * value.price;
            });

            var CreditPurchase = $resource('/api/purchase');

            var newPurchase = new CreditPurchase({sheetId: sheetId});
            newPurchase.sheetId = sheetId;
            newPurchase.flag = 1;
            newPurchase.editor = $rootScope.user.name;
            newPurchase.ordphdate = 7;
            newPurchase.itemSet = $rootScope.cart;
            newPurchase.$save();

            $window.alert('订单已确认！');
            $location.path('/');
        }
    };
}).directive('initImageZoom', function () {
    function link(scope, element, attrs) {
        jQuery(element).zoom({url: jQuery('.product-main-image img').attr('data-BigImgSrc')});
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
).directive('initTouchspin', function () {
    function link(scope, element, attrs) {
        jQuery(element).TouchSpin({
            buttondown_class: "btn quantity-down",
            buttonup_class: "btn quantity-up"
        });
        jQuery(".quantity-down").html("<i class='fa fa-angle-down'></i>");
        jQuery(".quantity-up").html("<i class='fa fa-angle-up'></i>");
    };
    return {
        link: link
    };
});

angular.module('bmallService', ['ngResource', 'ngCookies'])
    .factory('superCache', ['$cacheFactory', function($cacheFactory) {
        return $cacheFactory('super-cache');
    }])
    .factory('menuService', function ($rootScope,$resource,superCache) {
        $rootScope.menus=[];
        if (superCache.get('menus')) {
            $rootScope.menus = superCache.get("menus");
        } else {
            var p = $resource('/api/dept/');
            p.get(function (data) {

                $rootScope.menus = data._embedded.depts;

                superCache.put("menus",$rootScope.menus);
            });
        }
        return  $rootScope.menus;
    }).factory('goodsService', function ($rootScope, $resource, filterFilter, $cookieStore) {

    $rootScope.goodses = [];
    $rootScope.prices = [];

    var initGoodses = function (url) {
        if ($cookieStore.get("prices")) {
            $rootScope.prices = $cookieStore.get("prices");
        } else {
            var p = $resource('/api/goodsPrice');
            p.get(function (data) {
                $rootScope.prices = data._embedded.goodsPrices;
                $cookieStore.put("prices", $rootScope.prices);
            });
        }

        var Goods = $resource(url);
        Goods.get(function (data) {
            $rootScope.goodses = data;
            angular.forEach($rootScope.goodses._embedded.goodses, function (value) {
                var priceItem = filterFilter($rootScope.prices, {
                    guestId: $rootScope.user.name,
                    goodsId: value.id
                }, true);
                if(priceItem.price){
                     value.price = priceItem.price;
                }else{
                    value.price=0;
                }
            });
        });
    };

    initGoodses('/api/goods?size=9');


    return {
        get: function (id) {
            return filterFilter($rootScope.goodses, {id: id}, true);
        },
        pageNext: function (url) {
            initGoodses(url);
        }
    }

}).factory('cartService', function ($rootScope, $cookieStore,$location) {
    $rootScope.cart = [];

    if ($cookieStore.get('cart')) {
        $rootScope.cart = $cookieStore.get('cart');
    }

    return {
        set: function (goods) {

            goods.qty = 1;
            var index = -1;

            angular.forEach($rootScope.cart, function (value, key) {
                    if (value.id == goods.id) {
                        index = key;
                    }
                }
            );

            if (index > -1) {
                console.log('Cart in', index, goods.name);
                $rootScope.cart[index].qty = $rootScope.cart[index].qty + parseInt(goods.qty);
            } else {
                $rootScope.cart.push(goods);
            }
            $cookieStore.remove('cart');

            $cookieStore.put('cart', $rootScope.cart);
        },
        remove: function (index) {
            $rootScope.cart.splice(index, 1);
            $cookieStore.put('cart', $rootScope.cart);
        },
        clearCart:function(){
            $cookieStore.remove('cart');
            $rootScope.cart = [];
            $location.path('/');
        },
        getToltal:function(){
            var toltal=0;
            angular.forEach($rootScope.cart,function(value){
                toltal=toltal+value.price*value.qty;
            });
            return toltal;
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
);

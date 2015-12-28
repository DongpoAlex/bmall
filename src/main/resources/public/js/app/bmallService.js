angular.module('bMallService', ['ngResource'])
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

    var init = function (url) {
        var Goods = $resource(url);
        Goods.get(function (data) {
            $rootScope.goodses = data;
        });

    };

    return {
        initGoodses: init,

        get: function (id) {
            return filterFilter($rootScope.goodses, {goodsId: id}, true);
        },
        pageNext: function (url) {
            init(url);
        }
    }

}).factory('cartService', function ($rootScope, $location, $resource, $window) {

    var initCart = function () {
        $rootScope.cart = [];
        $rootScope.purchase = { note: '11111'};
        var CreditCart = $resource('/api/guestCart/search/byGuest?guestId=' + $rootScope.user.name);
        CreditCart.get(function (data) {
            $rootScope.cart = data._embedded.guestCarts;
            angular.forEach($rootScope.cart, function (value) {
                var CreditGoods = $resource('api/goods/search/byGoodsId?goodsId=' + value.goodsId + '&guestId=' + $rootScope.user.name);
                CreditGoods.get(function (goods) {
                    value.qty = 0;
                    value.sepc = goods.sepc;
                    value.deptId = goods.deptId
                    value.name = goods.name;
                    value.price = goods.price;
                    value.unitName = goods.unitName;
                });
            });
        });
    };


    return {
        initCart: initCart,

        set: function (goods) {
            var index = -1;
            angular.forEach($rootScope.cart, function (value, key) {
                    if (value.goodsId == goods.goodsId) {
                        index = key;
                        value.qty = value.qty + 1;
                    }
                }
            );
            if (index === -1) {
                goods.qty = 1;
                $rootScope.cart.push(goods);
            }

        },
        remove: function (index) {
            $rootScope.cart.splice(index, 1);
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

            var cartGoods = [];

            angular.forEach($rootScope.cart, function (value) {
                if (value.qty > 0) {
                    value.sheetId = sheetId;
                    value.sumPrice = value.qty * value.price;
                    cartGoods.push(value);
                }
            });

            if (cartGoods.length === 0) {
                $window.alert('订单商品数量不能为空!');
                return;
            }
            var CreditPurchase = $resource('/api/purchase');

            var newPurchase = new CreditPurchase({sheetId: sheetId});
            newPurchase.sheetId = sheetId;
            newPurchase.flag = 1;
            newPurchase.note = $rootScope.purchase.note;
            newPurchase.editor = $rootScope.user.name;
            newPurchase.ordphdate = 7;
            newPurchase.itemSet = cartGoods;
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
angular.module('bMallService', ['ngResource'])
    .factory('superCache', ['$cacheFactory', function ($cacheFactory) {
        return $cacheFactory('super-cache');
    }])
    .factory('menuService', function ($rootScope, $resource, superCache) {
        $rootScope.menus = [];
        var initMenus = function () {
            if (superCache.get('menus')) {
                $rootScope.menus = superCache.get("menus");
            } else {
                var p = $resource('api/dept/search/byGuest?guestId=' + $rootScope.user.name);
                p.get(function (data) {

                    $rootScope.menus = data._embedded.depts;

                    superCache.put("menus", $rootScope.menus);
                });
            }
        };

        return {init: initMenus};
    }).factory('goodsService', function ($rootScope, $resource, filterFilter) {

    $rootScope.goodses = [];

    var initGoods = function (url) {
        var Goods = $resource(url);
        Goods.get(function (data) {
            $rootScope.goodses = data;
        });
    };

    return {
        init: initGoods,
        get: function (id) {
            return filterFilter($rootScope.goodses, {goodsId: id}, true);
        },
        pageNext: function (url) {
            initGoods(url);
            $(document).scrollTop(300);
        }
    }

}).factory('cartService', function ($rootScope, $location, $resource, $window) {

    var initCart = function () {
        $rootScope.cart = [];
        $rootScope.purchase = {note: ''};

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
                if(goods.qty<1) goods.qty = 1;
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
            $location.path('/');
        }
    };
}).factory('customerService', function ($rootScope, $location, $resource) {
    return {
        postctm: function (regModel) {
            var CreditCustomer = $resource('/api/customer');
            var newCustomer = new CreditCustomer(regModel);
            newCustomer.$save();
            $location.path("/register/success");
        }
    }
}).factory('favoritesService', function ($rootScope,$resource) {
    $rootScope.favoritesGoodses = {};
    return {
        initFavorites:function(url){
            var CreditFavoritesGoods = $resource(url);
            CreditFavoritesGoods.get(function(data){
               $rootScope.favoritesGoodses=data;
            });
        },
        postGoods: function (goodsModel) {
            var CreditFavoritesGoods = $resource('/api/favoritesGoods/:id', null, {
                'update': {method: 'PUT'}
            });
            goodsModel.favorited=true;

            CreditFavoritesGoods.update({ id:goodsModel.modelId},goodsModel);

        },
        deleteGoods: function (goodsModel) {
            var CreditFavoritesGoods = $resource('/api/favoritesGoods/:id', null, {
                'update': {method: 'PUT'}
            });
            goodsModel.favorited=false;

            CreditFavoritesGoods.update({ id:goodsModel.modelId},goodsModel);
            Messenger().post({
                message: '商品 ' + goodsModel.name + '已从收藏中删除!',
                type: 'success',
                showCloseButton: true,
                phrase: 'Retrying TIME',
                auto: true,
                delay: 3,
                actions: false
            });
        }
    }
});

angular.module('bmallService', ['ngResource', 'ngCookies'])
    .factory('menuService', function ($resource) {
            return $resource('/api/dept/:id');
        }
    ).factory('goodsService', function ($resource) {

        return $resource('/api/goods/:id?size=9');

    }
).factory('cartService', function ($rootScope, $cookieStore) {
        $rootScope.cart = [];

        if($cookieStore.get('cart')){
            $rootScope.cart = $cookieStore.get('cart');
        }

        return {
            set: function (goods) {

                goods.qty = 1;
                var index = -1;

                angular.forEach($rootScope.cart, function (value,key) {
                        if(value.id==goods.id){
                            index=key;
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
            remove: function (goods) {
                var index = $rootScope.cart.indexOf(goods);
                $rootScope.cart.splice(index, 1);
                $cookieStore.put('cart', $rootScope.cart);

            }
        };
    }
).
directive('initImageZoom', function () {
        function link(scope, element, attrs) {
            jQuery(element).zoom({url: jQuery('.product-main-image img').attr('data-BigImgSrc')});
        };
        return {
            link: link
        };
    }
).directive('handleSidebarMenu', function () {
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

angular.module('bmallService', ['ngResource'])
    .factory('menuService', function ($resource) {
            return $resource('/api/dept/:id');
        }
    ).factory('goodsService', function ($resource) {

        return $resource('/api/goods/:id?size=9');

    }
).factory('cartService', function ($rootScope) {
        $rootScope.cart= [];
        return {
            get: function(){
                return $rootScope.cart;
            },
            set: function (goods) {
                $rootScope.cart.push(goods);
            },
            remove:function(goods){

            }
        };
    }
).directive('initImageZoom', function () {
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

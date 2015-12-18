angular.module('bmallService', ['ngResource'])
    .factory('menuService',function ($resource){

        return $resource('/api/dept/:id');

    }).factory('goodsService',function ($resource){

        return $resource('/api/goods/:id');

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
    });

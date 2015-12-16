angular.module('bmallService', [])
    .factory('menu', ['$http', function ($http) {
        return function (fnc) {
            $http.get('/api/dept').success(fnc);
        }
    }]).directive('handleSidebarMenu', function () {

    function link(scope, element, attrs) {
        var em =$(element);
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
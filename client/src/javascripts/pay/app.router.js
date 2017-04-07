/**
 * Created by Ehbraheem on 14/03/2017.
 */

(function () {

    "use strict";

    angular
        .module("pay")
        .config(RouterFunction);

    RouterFunction.$inject = ["$stateProvider", "$urlRouterProvider", "pay.config.APP_CONFIG"];

    function RouterFunction ($stateProvider, $urlRouterProvider, APP_CONFIG) {

        $stateProvider
            .state("home", {
                url: "/",
                templateUrl : APP_CONFIG.main_page_html
            })
            .state("success", {
                url: "/success?{TransactionReference}?{OrderID}",
                template: "<success> </success>"
            })
            .state("error", {
                url: "/error"
            })
            .state("cancel", {
                url: "/cancel"
            });

        $urlRouterProvider.otherwise("/");
    }
})();
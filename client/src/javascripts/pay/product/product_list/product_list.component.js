/**
 * Created by Ehbraheem on 14/03/2017.
 */

(function () {

    "use strict";

    angular
        .module("pay.product")
        .component("productList", {
            templateUrl : templateUrl,
            controller : ProductListController
        });

    templateUrl.$inject = ["pay.config.APP_CONFIG"];

    function templateUrl (APP_CONFIG) {
        return APP_CONFIG.product_list_html;
    }

    function ProductListController () {
        var $ctrl = this;
        
        return;
        /////////////////////
        
        // function () {
        //
        // }
    };
})();
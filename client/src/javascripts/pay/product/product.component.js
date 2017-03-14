/**
 * Created by Ehbraheem on 14/03/2017.
 */

(function () {

    "use strict";

    angular
        .module("pay.product")
        .component("product", {
            templateUrl : templateUrl,
            controller : ProductController
        });

    templateUrl.$inject = ["pay.config.APP_CONFIG"];

    ProductController.$inject = ["pay.product.Products"]

    function templateUrl (APP_CONFIG) {
        return APP_CONFIG.product_html;
    }

    function ProductController (Products) {

        var $ctrl = this;
        $ctrl.allProducts;

        activate();
        return;
        /////////////////////////////////
        function activate() {
            $ctrl.allProducts = Products.allProducts()[1]["S.T.E.M"];
            console.log($ctrl.allProducts["S.T.E.M"]);
            window.allProducts = $ctrl.allProducts;
        }

    };
})();
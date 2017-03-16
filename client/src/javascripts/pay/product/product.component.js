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
        $ctrl.tabs = makeTabs;
        $ctrl.allProducts = allProducts();
        // $ctrl.makeTab = currentTab;
        $ctrl.tab = 0;

        return;
        /////////////////////////////////
        function allProducts() {
            window.allProducts = Products.allProducts();
            return Products.allProducts();
        }

        function makeTabs() {
            return $ctrl.allProducts.map(function (elem) {
                return Object.keys(elem)[0];
            });
        }

        // function currentTab(tab) {
        //     var id = "#"+tab;
        //     $(".active").toggleClass("active", false);
        //     console.log(id);
        //    $(id).addClass("active")
        // }
    };
})();
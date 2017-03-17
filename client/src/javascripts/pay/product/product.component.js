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
        window.tabs = makeTabs();

        // $ctrl.makeTab = currentTab;
        // $ctrl.tab = $ctrl.tab || 0;
        // window.tab = $ctrl.tab;
        $ctrl.toggleTab = toggleTab;
        $ctrl.$onInit = toggleTab(0);

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

        function toggleTab(index) {
            var tab = $ctrl.tab = index;
            $ctrl.currentProduct = Object.values($ctrl.allProducts[tab])[0]; // To strip out the array from the returned nested array
            window.curent = $ctrl.currentProduct;
            return tab;
        }

        // function currentProduct() {
        //     // $ctrl.allProducts[]
        // }

        // function currentTab(tab) {
        //     var id = "#"+tab;
        //     $(".active").toggleClass("active", false);
        //     console.log(id);
        //    $(id).addClass("active")
        // }
    };
})();
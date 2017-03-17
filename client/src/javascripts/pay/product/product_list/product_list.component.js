/**
 * Created by Ehbraheem on 14/03/2017.
 */

(function () {

    "use strict";

    angular
        .module("pay.product")
        .component("productList", {
            templateUrl : templateUrl,
            controller : ProductListController,
            bindings : {
                products: '<',
                items: '<'
            }
        });

    templateUrl.$inject = ["pay.config.APP_CONFIG"];

    ProductListController.$inject = ["pay.config.APP_CONFIG"];

    function templateUrl (APP_CONFIG) {
        return APP_CONFIG.product_list_html;
    }

    function ProductListController (APP_CONFIG) {

        var $ctrl = this;
        $ctrl.productSrc = APP_CONFIG.images_src + "/codeiscool.jpg";
    };

        // .component('counter', {
        //     bindings: {
        //         count: '='
        //     },
        //     controller: function () {
        //         function increment() {
        //             this.count++;
        //         }
        //         console.log(this.count);
        //         function decrement() {
        //             this.count--;
        //         }
        //         this.increment = increment;
        //         this.decrement = decrement;
        //     },
        //     template: [
        //         '<div class="todo">',
        //         '<input type="text" ng-model="$ctrl.count">',
        //         '<button type="button" ng-click="$ctrl.decrement();">-</button>',
        //         '<button type="button" ng-click="$ctrl.increment();">+</button>',
        //         '</div>'
        //     ].join('')
        // });
})();
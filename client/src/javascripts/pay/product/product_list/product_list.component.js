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
                products: '<'
            }
        });


    templateUrl.$inject = ["pay.config.APP_CONFIG"];


    function templateUrl (APP_CONFIG) {
        return APP_CONFIG.product_list_html;
    }

    function ProductListController () {

        var $ctrl = this;
        $ctrl.showForm = showForm;


        $ctrl.$onChanges = function () {
            $ctrl.currentForm = null;
        };



        return;
        /////////////////////////////

        function showForm(index) {
            var buttonId = 'button' + index;
            $('#' + buttonId).remove();
            console.log(currentForm(index));
            $ctrl.currentForm = currentForm(index);
        }

        function currentForm(index) {
            var formId = index;
            var currentForm = {}
            currentForm[formId] = true;
            return currentForm;
        }
    };

})();
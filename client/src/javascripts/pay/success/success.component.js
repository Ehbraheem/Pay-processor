/**
 * Created by Ehbraheem on 27/03/2017.
 */
(function () {

    "use strict";

    angular
        .module("pay.success")
        .component("success", {
            templateUrl : templateUrl,
            controller : SuccessController
        });

    templateUrl.$inject = ["pay.config.APP_CONFIG"];

    function templateUrl (APP_CONFIG) {
        return APP_CONFIG.success_html;
    }

    SuccessController.$inject  = ["$stateParams", "pay.payment.Pay"];

    function SuccessController ($stateParams, Pay) {

        var $ctrl = this;


        $ctrl.$onInit = initializePage;


        return;
        ///////////////////////

        function initializePage() {
            console.log("This is stateParams", $stateParams);
            console.log(Pay.getPaymentDetails());
            $ctrl.transactionDetails = {
                transactionRef: $stateParams.TransactionReference,
                orderId: $stateParams.orderID
            }

        }

    }
})();
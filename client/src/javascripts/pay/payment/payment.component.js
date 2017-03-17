/**
 * Created by Ehbraheem on 17/03/2017.
 */

(function () {

    angular
        .module("pay.payment")
        .component("paymentForm", {
            templateUrl : templateUrl,
            controller : PaymentController,
            bindings: {
                price : '<'
            }
        });

    templateUrl.$inject = ["pay.config.APP_CONFIG"];

    function templateUrl (APP_CONFIG) {
        return APP_CONFIG.payment_form;
    }

    function PaymentController () {

        $ctrl = this;

    }
})();
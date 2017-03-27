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
                price : '<',
                product : '<'
            }
        });

    templateUrl.$inject = ["pay.config.APP_CONFIG"];

    function templateUrl (APP_CONFIG) {
        return APP_CONFIG.payment_form;
    }

    PaymentController.$inject = ["pay.payment.Pay", "pay.config.APP_CONFIG"];
    function PaymentController (Pay, APP_CONFIG) {

        var $ctrl = this;
        $ctrl.makePayment = makePayment;


        $ctrl.$onInit = function () {
            $ctrl.orderId = Pay.orderId($ctrl.price);
        };

        return;
        ///////////////////////////////////


        function orderId() {
            Pay.orderId($ctrl.price);
        }

        function makePayment() {
            var formParams = APP_CONFIG.paymentParams;
            formParams.email = $ctrl.email;
            formParams.amt = $ctrl.price;
            formParams.prd = $ctrl.product;

            Pay.makePay(formParams).then(
                function () {
                    console.log("success");
                },
                handleError
            )
        }

        function handleError(response) {
            console.log(response);
        }

    }
})();
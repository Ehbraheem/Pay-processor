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

    PaymentController.$inject = ["$scope", "pay.payment.Pay", "pay.config.APP_CONFIG"];
    function PaymentController ($scope, Pay, APP_CONFIG) {

        var $ctrl = this;
        $ctrl.email = "";
        // $ctrl.makePayment = makePayment;
        $ctrl.persistDetails = persistDetails;


        $ctrl.$onInit = function () {
            console.log("price is",$ctrl.price);
            $ctrl.orderId = Pay.getOrderId($ctrl.price);
        };

        $ctrl.$postLink = persistDetails();

        return;
        ///////////////////////////////////


        function orderId() {
            console.log("price is",$ctrl.price);
            Pay.getOrderId($ctrl.price);
        }

        function persistDetails() {
            console.log("am Called");
            var payDetails = {};
            payDetails.orderId = $ctrl.orderId;
            payDetails.price = $ctrl.price;
            payDetails.product = $ctrl.product;
            payDetails.email = $ctrl.email;
            console.log(payDetails);
            return Pay.setPaymentDetails(payDetails);
        }

        // function makePayment() {
        //     var formParams = APP_CONFIG.paymentParams;
        //     formParams.email = $ctrl.email;
        //     formParams.amt = $ctrl.price;
        //     formParams.prd = $ctrl.product;
        //
        //     Pay.makePay(formParams).then(
        //         function () {
        //             console.log("success");
        //         },
        //         handleError
        //     )
        // }
        //
        // function handleError(response) {
        //     console.log(response);
        // }

    }
})();
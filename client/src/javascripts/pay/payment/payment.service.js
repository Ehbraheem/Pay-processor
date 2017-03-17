/**
 * Created by Ehbraheem on 17/03/2017.
 */

(function () {

    angular
        .module("pay.payment")
        .service("pay.payment.Pay", PaymentService);

    PaymentService.$inject  = ["$http"];

    function PaymentService($http) {



    }
})();
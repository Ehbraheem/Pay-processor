/**
 * Created by Ehbraheem on 17/03/2017.
 */

(function () {

    angular
        .module("pay.payment")
        .service("pay.payment.Pay", PaymentService);

    // PaymentService.$inject  = ["$http", "pay.config.APP_CONFIG"];
    PaymentService.$inject  = ["pay.config.APP_CONFIG"];

    function PaymentService($http, APP_CONFIG) {

        var service = this;
        service.paymentDetails = {}
        service.orderCount = service.orderCount || 0;

        service.getOrderId = getOrderId;
        service.setPaymentDetails = setPaymentDetail;
        service.getPaymentDetails = getPaymentDetails;
        // service.makePay = makePay;

        service.saveDetails = saveDetails;
        service.restoreDetails = restoreDetails;


        return;
        //////////////////////////////////////

        function getOrderId(price) { // TODO: Refactor this method
            var cTime = new Date;
            var fullTime = cTime.getFullYear() + cTime.getHours() + cTime.getDay() + cTime.getMonth() + cTime.getSeconds() + cTime.getMinutes();
            var count = service.orderCount.toString();
            var pad = "0000";
            var newPrice = Math.random() * price;
            var ans = pad.substring(0, pad.length - count.length) + count;
            var orderId = ans + newPrice + fullTime;
            service.orderCount += 1;
            console.log("This is The new orderId:",orderId);
            return orderId;

        }
        
        // function makePay(params) {
        //     return $http({
        //         method: "POST",
        //         url: APP_CONFIG.providerUrl,
        //         data: $.param(params),
        //         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        //     })
        // }

        function setPaymentDetail(details) {
            console.log(details);
            service.saveDetails();
            return service.paymentDetails = details;
        }

        function getPaymentDetails() {
            return service.paymentDetails;
        }
        
        function saveDetails() {
            sessionStorage.removeItem("paymentDetails");
            sessionStorage.paymentDetails = angular.toJson(service.paymentDetails);
        }

        function restoreDetails() {
            service.paymentDetails = angular.fromJson(sessionStorage.paymentDetails);
            sessionStorage.removeItem("paymentDetails");
        }

    }
})();
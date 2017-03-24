/**
 * Created by Ehbraheem on 17/03/2017.
 */

(function () {

    angular
        .module("pay.payment")
        .service("pay.payment.Pay", PaymentService);

    PaymentService.$inject  = ["$http", "pay.config.APP_CONFIG"];

    function PaymentService($http, APP_CONFIG) {

        var service = this;
        service.orderCount = service.orderCount || 0;

        service.orderId = orderId;
        service.makePay = makePay;

        return;
        //////////////////////////////////////

        function orderId(price) { // TODO: Refactor this method
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
        
        function makePay(params) {
            return $http({
                method: "POST",
                url: APP_CONFIG.providerUrl,
                data: $.param(params),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        }
    }
})();
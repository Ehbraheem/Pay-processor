/**
 * Created by Ehbraheem on 14/03/2017.
 */

(function () {

    "use strict";

    angular
        .module("pay.config", [])
        .constant("pay.config.APP_CONFIG", {
            providerUrl : "https://skyecipgtest.skyebankng.com/app/MerchantServices/MakePayment.aspx",
            paymentParams : {
                merchantID : "05228",
                currCode: "566"
            },
            main_page_html : "pay/pages/main.html",
            product_html : "pay/product/product.html",
            product_list_html : "pay/product/product_list/product_list.html",

            payment_form : "pay/payment/form.html",

            success_html : "pay/success/success.html"
        });
})();

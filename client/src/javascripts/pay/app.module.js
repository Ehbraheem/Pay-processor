/**
 * Created by Ehbraheem on 14/03/2017.
 */
(function () {

    "use strict";

    angular
        .module("pay", [
            "ui.router",
            "pay.config",
            "pay.product",
            "pay.payment",
            "pay.success"
        ]);
})();
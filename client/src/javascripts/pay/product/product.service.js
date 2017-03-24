/**
 * Created by Ehbraheem on 14/03/2017.
 */

(function () {

    "use strict";

    angular
        .module("pay.product")
        .service("pay.product.Products", ProductService);


    function ProductService() {

        var service = this;
        service.products = [

            {
                "Core Lab": [
                    {
                        "name": "App Lab",
                        "price": 200000,
                        "duration": "4 months"
                    },
                    {
                        "name": "Workforce Lab",
                        "price": 400000,
                        "duration": "4 months"
                    }
                ]
            },
            {"S.T.E.M" : [
                {
                    "name" : "Robotics",
                    "price" : 35000,
                    "duration": "1 Week"
                },
                {
                    "name" : "Creative Computing",
                    "price" : 35000,
                    "duration": "1 Week"
                },
                {
                    "name": "Science Lab (Python)",
                    "price": 50000,
                    "duration": "2 Weeks"
                }
            ]
            } ,
            {
                "Corporate training": [
                    {
                        "name": "Social media & marketing",
                        "price": 50000,
                        "duration": "1 Week"
                    },
                    {
                        "name": "Business intelligence",
                        "price": 50000,
                        "duration": "1 Week"
                    }
                ]
            }
        ];


        service.allProducts = allProducts;

        service.getProductList = getProductList;

        service.getSingleProduct = getSingleProduct;

        return;
        ///////////////////////

        function allProducts() {
            return service.products;
        }

        function getProductList(index) {
            return service.products[key];
        }

        function getSingleProduct(topIndex, productIndex) {
            return service.products[topIndex][productIndex];
        }
    }
})();
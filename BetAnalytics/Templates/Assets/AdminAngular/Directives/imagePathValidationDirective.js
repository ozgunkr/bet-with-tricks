angular.module("imagePathValidationDirective", ['ngMessages'])
    .directive("imggame", function () {

        return {
            restrict: "A",
            //scope: true,
            replace: true,
            require: "ngModel",
            link: function (scope, element, attr, ctrl) {

                //ImageField Validator
                imageValidator = function (ngModelValue) {



                    // check if value is Alphadash
                    if (ngModelValue.startsWith("../Templates/GameImages/")) {
                        ctrl.$setValidity('prefixValidator', true);
                    } else {
                        ctrl.$setValidity('prefixValidator', false);
                    }
                    
                    return ngModelValue


                }
                ctrl.$parsers.push(imageValidator);
                
                
            }
        }
    })

    .directive("imgarticle", function () {

        return {
            restrict: "A",
            //scope: true,
            replace: true,
            require: "ngModel",
            link: function (scope, element, attr, ctrl) {

                //ImageField Validator
                imageValidator = function (ngModelValue) {



                    // check if value is Alphadash
                    if (ngModelValue.startsWith("../Templates/ArticleImages/")) {
                        ctrl.$setValidity('prefixValidator', true);
                    } else {
                        ctrl.$setValidity('prefixValidator', false);
                    }

                    return ngModelValue


                }
                ctrl.$parsers.push(imageValidator);


            }
        }
    })

   
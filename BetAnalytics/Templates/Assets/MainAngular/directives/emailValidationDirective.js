angular.module("emailValidationDirective", ["ngMessages"])
    .directive("e", function () {
        return {
            restrict: "A",
            //scope: true,
            replace: true,
            require: "ngModel",
            link: function (scope, element, attr, ctrl) {

                //Email Validator
                emailValidator = function (ngModelValue) {


                    var string = ngModelValue
                    var Start = string.indexOf('@');
                    var Stop = string.indexOf('.com');
                    var ex = string.substring(Start, Stop);
                    var emails = ["@gmail", "@yahoo", "@msn", "@hotmail"];



                    //check if email is correct

                    if (emails.indexOf(ex) <= -1) {
                        ctrl.$setValidity('emailValidator', true);
                    } else {
                        ctrl.$setValidity('emailValidator', false);
                    }

                    return ngModelValue


                }
                ctrl.$parsers.push(emailValidator);


            }


        }


    })
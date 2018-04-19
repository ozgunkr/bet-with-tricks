angular.module("NameValidationDirective", ['ngMessages'])
    .directive("n", function () {

        return {
            restrict: "A",
            //scope: true,
            replace: true,
            require: "ngModel",
            link: function (scope, element, attr, ctrl) {

                //Name Validator
                nameValidator = function(ngModelValue) {


                    // check if name field includes name and surname
                    howManyWords = ngModelValue.trim();
                    howManyWords = howManyWords.replace(/\s{2,}/g, ' '); //remove extra spaces
                    howManyWords = howManyWords.split(' ');

                    if (howManyWords.length == 2) {
                        ctrl.$setValidity('fullnameValidator', true);
                    } else {
                        ctrl.$setValidity('fullnameValidator', false);
                    }

                    // check if value is Alphadash
                    if (/^[a-z_ şŞıİçÇöÖüÜĞğ]+$/i.test(ngModelValue)) {
                        ctrl.$setValidity('alphadashValidator', true);
                    } else {
                        ctrl.$setValidity('alphadashValidator', false);
                    }

                    //check if length is lower than 5
                    if (ngModelValue.length < 5) {
                        ctrl.$setValidity('nValidator', false);
                    } 
                    else {
                        ctrl.$setValidity('nValidator', true);
                    }
                    
                    return ngModelValue

                   
                }
                ctrl.$parsers.push(nameValidator);


            }
        }
    })
angular.module("ContactController", [])
    .controller("ContactCtrl", ["$scope", "$http", function ($scope, $http) {

        var userip;
        $.getJSON("http://jsonip.com?callback=?", function (data) {
            userip = data.ip;
        });

        $scope.submitContactForm = function () {
            $scope.ContactList = [];

            name = $scope.fname;
            email = $scope.email;
            comment = $scope.comment;
            login_ip = userip;

            //$scope.loading2 = true;

            $scope.ContactList.push({
                name: name,
                email: email,
                comment: comment,
                login_ip: login_ip
            });

            json = $scope.ContactList;
            j = JSON.stringify(json);

            $http.post("/Contact/SaveContact", j)
                .then(function (response) {

                    setTimeout(function () {
                        $('#flipper').toggleClass("flip");
                    }, 2000);
                    $('#flipper').toggleClass("flip");

                    $scope.ContactList = [];

                    $scope.fname = "";
                    $scope.email = "";
                    $scope.comment = "";
                    login_ip = "";
                    $scope.contactform.$setPristine();
                }),
                function (error, status) {
                    $scope.message = error.error;
                };


        };

    }])

    


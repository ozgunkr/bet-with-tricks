angular.module("ContactPageController", [])
    .controller("AdminContactPageCtrl", ["$scope", "$http", function ($scope, $http) {

        var MyDate_String_Value = ""
        $scope.ContactList = [];

        $http.get("/Contact/GetContacts")
            .then(function (response) {

                console.log(response.data);
                $scope.ContactList = response.data;

                for (i = 0; i < $scope.ContactList.length; i++) {
                    MyDate_String_Value = $scope.ContactList[i].create_date;

                    var value = new Date
                        (
                        parseInt(MyDate_String_Value.replace(/(^.*\()|([+-].*$)/g, ''))
                        );
                    var dat = value.getMonth() +
                        1 +
                        "/" +
                        value.getDate() +
                        "/" +
                        value.getFullYear();


                    $scope.ContactList[i].create_date = dat;
                    //
                }
            })


    }])
angular.module("BetPageController", [])
    .controller("BetPageCtrl", ["$scope", "$http", function ($scope, $http) {

        $scope.deleteError = false;
        var MyDate_String_Value = "";
        $scope.BetMasterListPg = [];


        $scope.artAct = ["1", "0"];
        
        $scope.loading = false;

        $http.get("/BetMaster/GetBets")
            .then(function (response) {

                $scope.BetMasterListPg = response.data;

                for (i = 0; i < $scope.BetMasterListPg.length; i++) {
                    MyDate_String_Value = $scope.BetMasterListPg[i].create_date;

                    var value = new Date
                        (
                        parseInt(MyDate_String_Value.replace(/(^.*\()|([+-].*$)/g, ''))
                        );
                    var month = value.getMonth() + 1;

                    var dat = value.getDate() +
                        "/" +
                        month +
                        "/" +
                        value.getFullYear();


                    $scope.BetMasterListPg[i].create_date = dat;
                }

                
            });


        // Edit Function
        $scope.editModal = function (id) {

            $scope.deleteError = false;

            var req = JSON.stringify({ gid: id });
            //Master List
            $scope.BetMasterList = [];

            $http.post("/BetMaster/GetBetMasterByID", req)
                .then(function (response) {
                    $scope.BetMasterList = response.data;
                    //console.log(response.data)
                    $scope.betname = $scope.BetMasterList[0].bet_name;
                    $scope.isActive = $scope.BetMasterList[0].is_active;
                    $scope.betDescription = $scope.BetMasterList[0].description;

                });


            //Detail List
            $scope.BetDetailList = [];

            $http.post("/BetMaster/GetBetDetailByID", req)
                .then(function (response) {
                    $scope.BetDetailList = response.data;
                    //console.log(response.data)
                });
        };

        // Delete All Function
        $scope.deleteModal = function (id, index) {

            var req = JSON.stringify({ bet_id: id });
            $http.post("/BetMaster/DeleteBetsByID", req)
                .then(function (response) {
                    $scope.BetMasterList = response.data;
                });

            $scope.BetMasterListPg.splice(index, 1);

        };

        // Delete Detail Function
        $scope.deleteDetail = function (id, index) {

            if ($scope.BetDetailList.length > 1) {
                var req = JSON.stringify({ id: id });
                console.log(req);
                $http.post("/BetMaster/DeleteBetsDetailByID", req)
                    .then(function (response) {
                    });

                $scope.BetDetailList.splice(index, 1);

            }
            else {
                $scope.deleteError = true;
            }


        };

        // Add New Row To Details
        $scope.addRow = function () {

            $scope.BetDetailList.push({
                preference: '',
                trust: '',
                ratio: '',
                possibility: '',
                game_code: '',
                game_name: ''
            });
        };

        // Update Games Function
        $scope.updateBets = function () {
            $scope.BetMasterUpdateList = [];


            id = $scope.BetMasterList[0].id;
            bet_name = $scope.betname;
            is_active = $scope.isActive;
            description = $scope.betDescription;


            detail = $scope.BetDetailList;

            //$scope.loading2 = true;

            $scope.BetMasterUpdateList.push({
                id: id,
                bet_name: bet_name,
                is_active: is_active,
                description: description,
                BETDETAILUPDATE: detail
            });

            json = $scope.BetMasterUpdateList;
            j = JSON.stringify(json);
            /*
           desc = $scope.description;
           console.log(desc);
           */

            $scope.loading = true;
            $http.post("/BetMaster/UpdateBet", j)
                .then(function (response) {


                    $scope.BetMasterUpdateList = [];
                    alert("Game is Updated");
                    window.location.reload();

                    $scope.loading = false;
                }),
                function (error, status) {
                    $scope.message = error.error;
                };


        };



    }]);
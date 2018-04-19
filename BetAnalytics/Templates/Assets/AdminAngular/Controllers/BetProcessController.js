angular.module("BetProcessController", [])
    .controller("BetProcessCtrl", ["$scope", "$http", function ($scope, $http) {



        $scope.artAct = ["1", "0"];

        $scope.NewBetDetailList = [];
        $scope.rowError = false;
        

        $scope.addRow = function () {

            $scope.loading = false;

            $scope.rowError = false;

            $scope.NewBetDetailList.push({
                preference: '',
                trust: '',
                ratio: '',
                possibility: '',
                region: '',
                game_code: '',
                game_name: '',
                game_date: ''

            });

        };
        $scope.deleteRow = function (index) {
            $scope.NewBetDetailList.splice(index, 1);
        };


        $scope.submit = function () {

            $scope.rowError = false;
            $scope.BetMaster = [];

            bet_name = $scope.betname;
            description = $scope.betDescription;


            detail = $scope.NewBetDetailList;


            if (detail.length > 0) {
                //$scope.loading2 = true;

                $scope.BetMaster.push({
                    bet_name: bet_name,
                    is_active: "1",
                    description: description,
                    BETDETAIL: detail
                });

                json = $scope.BetMaster;
                j = JSON.stringify(json);
                /*
               desc = $scope.description;
               console.log(desc);
               */

                $scope.loading = true;
                $http.post("/BetMaster/SaveBets", j)
                    .then(function (response) {


                        $scope.NewBetDetailList = [];
                        $scope.BetMaster = [];
                        $scope.betname = "";
                        $scope.betDescription = "";
                        $scope.masterForm.$setPristine();

                        alert("Bet is Saved");
                        $scope.loading = false;
                    }),
                    function (error, status) {
                        $scope.message = error.error;
                    };

            }

            else {

                $scope.rowError = true;


            }
        };


    }]);
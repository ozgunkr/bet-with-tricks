angular.module("BetListController", ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .controller("BetListCtrl", ["$scope", "$http", function ($scope, $http) {

        $scope.AllBetsList = [];



        $http.get("/BetMaster/GetBets")
            .then(function (response) {
                $scope.AllBetsList = response.data;

                $scope.currentPage = 1;
                $scope.itemsPerPage = 20;
                $scope.searchItem = "";

                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };

                $scope.updatePageIndexes = function () {
                    $scope.firstIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;
                    $scope.lastIndex = $scope.currentPage * $scope.itemsPerPage;
                };
                $scope.updatePageIndexes();


            });

        $scope.openDetailModal = function (id) {

            $scope.totalRatio = "";
            $scope.avgPossibility = "";

            var req = JSON.stringify({ gid: id });

            $scope.ReturnMasterAllGameList = [];

            $http.post("/BetMaster/GetBetMasterByID", req)
                .then(function (response) {
                    $scope.ReturnMasterAllBetList = response.data;
                    $scope.betName = $scope.ReturnMasterAllBetList[0].bet_name;
                    $scope.betDescription = $scope.ReturnMasterAllBetList[0].description;

                });


            //Detail List
            $scope.AllBetDetailLst = [];

            $http.post("/BetMaster/GetBetDetailByID", req)
                .then(function (response) {
                    $scope.AllBetDetailLst = response.data;

                    var totalRatio = 1;
                    var avgPossibility = 0;

                    for (i = 0; i < $scope.AllBetDetailLst.length; i++) {
                        totalRatio = parseFloat($scope.AllBetDetailLst[i].ratio).toFixed(2) * totalRatio;
                        
                        avgPossibility = avgPossibility + parseInt($scope.AllBetDetailLst[i].possibility);
                    }


                    $scope.totalRatio = totalRatio.toFixed(2);;
                    $scope.avgPossibility = (avgPossibility / $scope.AllBetDetailLst.length).toFixed(2);


                });

        }


    }]);
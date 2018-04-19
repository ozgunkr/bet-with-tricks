angular.module("AllGamesController", ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .controller("AllGamesCtrl", ["$scope", "$http", function ($scope, $http) {
        
        $scope.AllGamesList = [];
        $scope.AllGameDetailLst = [];

       
        
        $http.get("/GameMaster/GetGames")
            .then(function (response) {
                $scope.AllGamesList = response.data;
                // calculation overdue of match

                /*
                now90 = moment().add(90, 'minutes');
                var fmt = 'DD/MM/YYYY HH:mm:ss';
                var result90 = moment.utc(now90, fmt).local().format(fmt);

                now60 = moment().add(60, 'minutes');
                var fmt = 'DD/MM/YYYY HH:mm:ss';
                var result60 = moment.utc(now60, fmt).local().format(fmt);
                */

                var now = new Date();
                var fmt = 'DD/MM/YYYY HH:mm:ss';
                //var result = moment.utc(now, fmt).local().format(fmt);
                var result = moment(now).format();;


                var currentState = 0;
                var img="";

                for (i = 0; i < $scope.AllGamesList.length; i++) {

                    var gameDate = $scope.AllGamesList[i].game_date;
                    //var gameActualDate = moment(gameDate).format(fmt);
                    var gameActualDate = moment(gameDate).format();
                    var gameActualDate2 = moment(gameDate).format(fmt);
                    console.log(gameActualDate2);
                    //var result90 = moment(gameDate).add(90, 'minutes').format(fmt);
                    //var result60 = moment(gameDate).add(60, 'minutes').format(fmt);

                    var result90 = moment(gameDate).add(90, 'minutes').format();
                    var result60 = moment(gameDate).add(60, 'minutes').format();

                    

                    //console.log($scope.AllGamesList[i].category,$scope.AllGamesList[i].game_name, "gamedate=", gameActualDate, "now=", result, "now60", result60, "now90", result90);
                  
                    if (result < gameActualDate) {
                        //$scope.AllGamesList[i].current_state = "../Templates/Images/after.png";
                        $scope.AllGamesList[i].current_state = gameActualDate2;
                    }
                    else if (result > gameActualDate && result < result90 && $scope.AllGamesList[i].category == 'Futbol' ){

                        //$scope.AllGamesList[i].current_state = "../Templates/Images/duringFB.gif";
                        $scope.AllGamesList[i].current_state = "Devam Ediyor";
                    }
                    else if (result > gameActualDate && result < result60 && $scope.AllGamesList[i].category == 'Basketbol' ){

                        //$scope.AllGamesList[i].current_state = "../Templates/Images/duringBB.gif";
                        $scope.AllGamesList[i].current_state = "Devam Ediyor";
                    }
                    else {

                        //$scope.AllGamesList[i].current_state = "../Templates/Images/before.png";
                        $scope.AllGamesList[i].current_state = "Maç Tamamlandı!";
                    }
                    
                }

                //
                
                
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
            
            var req = JSON.stringify({ gid: id });

            $scope.ReturnMasterAllGameList = [];

            $http.post("/GameMaster/GetGameMasterByID", req)
                .then(function (response) {
                    $scope.ReturnMasterAllGameList = response.data;
                    $scope.gameName = $scope.ReturnMasterAllGameList[0].game_name;
                    $scope.gameDescription = $scope.ReturnMasterAllGameList[0].description;

                });


            //Detail List
            $scope.AllGameDetailLst = [];

            $http.post("/GameMaster/GetGameDetailByID", req)
                .then(function (response) {
                    $scope.AllGameDetailLst = response.data;
                });

        }
        

    }]);
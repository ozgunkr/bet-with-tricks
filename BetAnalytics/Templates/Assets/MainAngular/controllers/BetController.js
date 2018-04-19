angular.module("BetController", ['angular.filter'])

    .controller("BetCtrl", ["$scope", "$http", function ($scope, $http) {

        $scope.GameMasterList = [];
        $scope.GameDetailsList = [];

        $http.get("/GameMaster/GetGames")
            .then(function (response) {
                $scope.GameMasterList = response.data;


                for (i = 0; i < $scope.GameMasterList.length; i++) {
                    MyDate_String_Value = $scope.GameMasterList[i].game_date;

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
                    
                    $scope.GameMasterList[i].game_date = dat;
                }

                
                min = null;
                
                for (i = 0; i < $scope.GameMasterList.length; i++) {
                    var current = $scope.GameMasterList[i];
                    if ((min === null || current.game_date > min) && (current.is_active == "1" )) {
                        min = $scope.GameMasterList[i].id;
                    }
                }

                for (i = 0; i < $scope.GameMasterList.length; i++) {
                    var current = $scope.GameMasterList[i];
                    if ((current.id == min) && (current.is_active == "1")) {
                        $scope.getTab(current.game_day_prompt, current.game_date);
                    }
                }


               
            });

        // Modal Open Function
        $scope.getGameDetails = function (id, index) {
            

            var req = JSON.stringify({ gid: id });


            $scope.ReturnMasterList = [];

            $http.post("/GameMaster/GetGameMasterByID", req)
                .then(function (response) {
                    $scope.ReturnMasterList = response.data;
                    //console.log($scope.ReturnMasterList);
                    $scope.gameName = $scope.ReturnMasterList[0].game_name;
                    $scope.gameDescription = $scope.ReturnMasterList[0].description;

                });


            //Detail List
            $scope.GameDetailsList = [];

            $http.post("/GameMaster/GetGameDetailByID", req)
                .then(function (response) {
                    $scope.GameDetailsList = response.data;
                    //console.log(response.data)
                });

        };


        $scope.getTab = function (gamedayprompt, game_date) {
            

            $scope.GameMasterPageList = [];
            $scope.gameCat = [];
            var lookup = {};
            
            for (var item, i = 0; item = $scope.GameMasterList[i++];) {
                var category = item.category;
                var sub_category = item.sub_category;
                var game_day = item.game_day;

                if (!(sub_category in lookup) && item.is_active == '1' && item.game_day_prompt == gamedayprompt && item.game_date == game_date) {
                    lookup[sub_category] = 1;
                    $scope.gameCat.push({
                        category: category,
                        sub_category: sub_category,
                        game_day: game_day

                    }); 
   
                }


                if (item.is_active == '1' && item.game_day_prompt == gamedayprompt && item.game_date == game_date) {
                    $scope.GameMasterPageList.push(item);
                }
                
                }
            $scope.fCategory = "";
            $scope.bCategory = "";
            for (i = 0; i < $scope.gameCat.length; i++) {
                

                if ($scope.gameCat[i].category == "Futbol") {
                    $scope.fCategory = $scope.gameCat[i].category;
                }
                if ($scope.gameCat[i].category == "Basketbol") {
                    $scope.bCategory = $scope.gameCat[i].category;
                }
            }

            lookup = {};


        };

    }]);
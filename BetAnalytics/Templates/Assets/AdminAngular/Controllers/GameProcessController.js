angular.module("GameProcessController", [])
    .controller("GameProcessCtrl", ["$scope", "$http", function ($scope, $http) {

        


        $scope.artAct = ["1", "0"];
        var gameCat = ["Futbol", "Basketbol"];
        var gameSubCat = [
                                ["PremierLeague", "BundesLiga", "SuperLig", "SerieA", "LaLiga", "ChampionsLeague", "UEFALeague", "League1"],
                                ["NBA", "EuroLeague", "TBL"]
                             ]
        
            $scope.gameCat = gameCat;
            $scope.gameSubCat = []; 

            $scope.getSubCat = function () {
                var key = $scope.gameCat.indexOf($scope.gameCategory);
                var myNewOptions = gameSubCat[key];
                $scope.gameSubCat = myNewOptions;
            };

        $scope.NewGameList = [];
        $scope.rowError = false;

        //console.log($scope.gameSubCat);

        $scope.addRow = function () {

            $scope.loading = false;

            $scope.rowError = false;

            $scope.NewGameList.push({
                preference: '',
                trust: '',
                ratio: '',
                possibility: '',
                region: '',
                game_code: ''

            });

        };
        $scope.deleteRow = function (index) {
            $scope.NewGameList.splice(index, 1);
        };


        $scope.submit = function () {

            $scope.rowError = false;
            $scope.GameMaster = [];

            game_name = $scope.gamename;
            image = $scope.imgpath;
            description = $scope.gameDescription;
            category = $scope.gameCategory;
            sub_category = $scope.gameSubCategory;
            priority = $scope.priority;
            game_date = $scope.gameDate;
            game_date2 = $scope.gameDate.toLocaleString();

            console.log(game_date);
            console.log(game_date2);

            detail = $scope.NewGameList;


            if (detail.length > 0) {
                //$scope.loading2 = true;

                $scope.GameMaster.push({
                    game_name: game_name,
                    image: image,
                    is_active: "1",
                    category: category,
                    sub_category: sub_category,
                    description: description,
                    priority: priority,
                    game_date: game_date,
                    GAMEDETAIL: detail
                });

                json = $scope.GameMaster;
                j = JSON.stringify(json);
                /*
               desc = $scope.description;
               console.log(desc);
               */
                //console.log(j);

                $scope.loading = true;
                $http.post("/GameMaster/SaveGames", j)
                    .then(function (response) {


                        $scope.NewGameList = [];
                        $scope.GameMaster = [];
                        $scope.gamename = "";
                        $scope.imgpath = "";
                        $scope.gameCategory = "";
                        $scope.gameSubCategory = "";
                        $scope.gameDescription = "";
                        $scope.priority = "";
                        $scope.gameDate = "";
                        $scope.masterForm.$setPristine();

                        $scope.loading = false;
                        alert("Game is Saved");
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
angular.module("GamesPageController", [])
    .controller("GamesPageCtrl", ["$scope", "$http", function ($scope, $http) {
        $scope.deleteError = false;
        var MyDate_String_Value = "";
        $scope.GameMasterListPg = [];


        $scope.artAct = ["1", "0"];
        var gameCat = ["Futbol", "Basketbol"];
        var gameSubCat = [
            ["PremierLeague", "BundesLiga", "SuperLeague", "SerieA", "LaLiga", "ChampionsLeague", "UEFALeague", "League1"],
            ["NBA", "EuroLeague", "TBL"]
        ]

        $scope.gameCat = gameCat;
        $scope.gameSubCat = [];

        $scope.getSubCat = function () {
            var key = $scope.gameCat.indexOf($scope.gameCategory);
            var myNewOptions = gameSubCat[key];
            $scope.gameSubCat = myNewOptions;
        };



        $scope.loading = false;

        $http.get("/GameMaster/GetGames")
            .then(function (response) {

                $scope.GameMasterListPg = response.data;

                for (i = 0; i < $scope.GameMasterListPg.length; i++) {
                    MyDate_String_Value = $scope.GameMasterListPg[i].create_date;

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


                    $scope.GameMasterListPg[i].create_date = dat;
                }


                
            });


        // Edit Function
        $scope.editModal = function (id) {

            $scope.deleteError = false;

            var req = JSON.stringify({ gid: id });
            //Master List
            $scope.GameMasterList = [];

            $http.post("/GameMaster/GetGameMasterByID", req)
                .then(function (response) {
                    $scope.GameMasterList = response.data;
                    //console.log(response.data)
                    $scope.gamename = $scope.GameMasterList[0].game_name;
                    $scope.imgpath = $scope.GameMasterList[0].image;
                    $scope.isActive = $scope.GameMasterList[0].is_active;
                    $scope.gameCategory = $scope.GameMasterList[0].category;
                    $scope.gameSubCategory = $scope.GameMasterList[0].sub_category;
                    $scope.gameDescription = $scope.GameMasterList[0].description;
                    $scope.priority = $scope.GameMasterList[0].priority;

                });


            //Detail List
            $scope.GameDetailList = [];

            $http.post("/GameMaster/GetGameDetailByID", req)
                .then(function (response) {
                    $scope.GameDetailList = response.data;
                    //console.log(response.data)
                });
        };

        // Delete All Function
        $scope.deleteModal = function (id, index) {

            var req = JSON.stringify({ game_id: id });
            console.log(req);
            $http.post("/GameMaster/DeleteGamesByID", req)
                .then(function (response) {
                    $scope.GameMasterList = response.data;
                });

            $scope.GameMasterListPg.splice(index, 1);

        };

        // Delete Detail Function
        $scope.deleteDetail = function (id, index) {

            if ($scope.GameDetailList.length > 1) {
                var req = JSON.stringify({ game_detail_id: id });
                console.log(req);
                $http.post("/GameMaster/DeleteGameDetailByID", req)
                    .then(function (response) {
                    });

                $scope.GameDetailList.splice(index, 1);

            }
            else {
                $scope.deleteError = true;
            }


        };

        // Add New Row To Details
        $scope.addRow = function () {

            $scope.GameDetailList.push({
                preference: '',
                trust: '',
                ratio: '',
                possibility: '',
                region: '',
                game_code: ''
            });
        };

        // Update Games Function
        $scope.updateGames = function () {
            $scope.GameMasterUpdateList = [];


            id = $scope.GameMasterList[0].id;
            game_name = $scope.gamename;
            image = $scope.imgpath;
            is_active = $scope.isActive;
            category = $scope.gameCategory;
            sub_category = $scope.gameSubCategory;
            description = $scope.gameDescription;
            priority = $scope.priority;


            detail = $scope.GameDetailList;

            //$scope.loading2 = true;

            $scope.GameMasterUpdateList.push({
                id: id,
                game_name: game_name,
                image: image,
                is_active: is_active,
                category: category,
                sub_category: sub_category,
                description: description,
                priority: priority,
                GAMEUPDATEDETAIL: detail
            });

            json = $scope.GameMasterUpdateList;
            j = JSON.stringify(json);
            /*
           desc = $scope.description;
           console.log(desc);
           */

            $scope.loading = true;
            $http.post("/GameMaster/UpdateGame", j)
                .then(function (response) {


                    $scope.GameMasterUpdateList = [];
                    alert("Game is Updated");
                    window.location.reload();

                    $scope.loading = false;
                }),
                function (error, status) {
                    $scope.message = error.error;
                };


        };

    }]);
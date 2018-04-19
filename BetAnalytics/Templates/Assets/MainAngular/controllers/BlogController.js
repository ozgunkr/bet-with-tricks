angular.module("BlogController", [])
    .controller("BlogCtrl", ["$scope", "$http", function ($scope, $http) {

        $scope.artCat = ["Futbol", "Basketbol", "HEPSİ"];
        $scope.ArticleList = [];
        MyDate_String_Value = "";

        $scope.setCat = function (cat) {
            if (cat == "Futbol") {
                $scope.searchItem = "Futbol";
            }
            else if (cat == "Basketbol") {
                $scope.searchItem = "Basketbol";
            }
            else if (cat == "Hepsi") {
                $scope.searchItem = "";
            }
        }

        $http.get("/ArticleMaster/GetArticles")
            .then(function (response) {
                $scope.ArticleList = response.data;


                // Pagination Settings
                $scope.currentPage = 1;
                $scope.itemsPerPage = 3;
                $scope.searchItem = "";

                $scope.setPage = function (pageNo) {
                    $scope.currentPage = pageNo;
                };

                $scope.updatePageIndexes = function () {
                    $scope.firstIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;
                    $scope.lastIndex = $scope.currentPage * $scope.itemsPerPage;
                };
                $scope.updatePageIndexes();
                //

                // Convert Date
                for (i = 0; i < $scope.ArticleList.length; i++) {
                    MyDate_String_Value = $scope.ArticleList[i].create_date;

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


                    $scope.ArticleList[i].create_date = dat;
                    //
                }

            })


    }]);
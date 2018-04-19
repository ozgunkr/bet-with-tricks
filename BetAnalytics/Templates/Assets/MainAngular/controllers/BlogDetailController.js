angular.module("BlogDetailController", ["ngSanitize"])
    .controller("BlogDetailCtrl", ["$scope", "$http", function ($scope, $http) {

        $scope.ArticleDetail = [];
        MyDate_String_Value = "";

        $scope.$watch("articleID", function () {
            var id = $scope.articleID;

            var req = JSON.stringify({ aid: id });

            $http.post("/ArticleMaster/GetArticleByID", req)
                .then(function (response) {
                    $scope.articleName = response.data[0].article_name;
                    $scope.author = response.data[0].author;
                    $scope.image = response.data[0].image;
                    $scope.articleContent = response.data[0].article_content;

                    MyDate_String_Value = response.data[0].create_date;

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


                    $scope.createDate = dat;
                })
        });

       


    }]);
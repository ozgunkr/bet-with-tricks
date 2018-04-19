angular.module("ArticleProcessController", ['ngMaterial','ngMessages'])
    .controller("ArticleProcessCtrl", ["$scope", "$http", function ($scope, $http) {
        this.myDate = new Date();
        this.isOpen = false;

        $scope.loading = false; 

        $scope.artCat = ["Futbol", "Basketbol"]
        $scope.artLan = ["EN", "TR"]

        $scope.submit = function () {
            $scope.ArticleList = [];

            article_name = $scope.articleName;
            article_category = $scope.articleCategory;
            image = $scope.imgpath;
            article_content_short = $scope.articleContentShort;
            article_content = $scope.articleContent;
            language = $scope.language;
            valid_from = $scope.validFrom;
            valid_to = $scope.validTo;
            author = $scope.author;
            

            //$scope.loading2 = true;

            $scope.ArticleList.push({
                article_name: article_name,
                article_category: article_category,
                image: image,
                article_content_short: article_content_short,
                article_content: article_content,
                language: language,
                valid_from: valid_from,
                valid_to: valid_to,
                is_active: "1",
                author: author
            });

            json = $scope.ArticleList;
            j = JSON.stringify(json);

            console.log(j);

            $scope.loading = true;
            $http.post("/ArticleMaster/SaveArticle", j)
                .then(function (response) {


                    $scope.ArticleList = [];
                    alert("Article is Saved")
                    $scope.loading = false;
                }),
                function (error, status) {
                    $scope.message = error.error;
                };


        };

    }])
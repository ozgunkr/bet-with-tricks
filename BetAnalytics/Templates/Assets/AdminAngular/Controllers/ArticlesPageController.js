angular.module("ArticlesPageController", ['ngMaterial', 'ngMessages'])
    .controller("ArticlesPageCtrl", ["$scope", "$http", function ($scope, $http) {
        
        var MyDate_String_Value = ""
        $scope.ArticleListPg = [];

        $scope.loading = false;

        $scope.artAct = ["1", "0"]
        $scope.artCat = ["Futbol", "Basketbol"]
        $scope.artLan = ["EN", "TR"]

        $http.get("/ArticleMaster/GetArticles")
            .then(function (response) {

                $scope.ArticleListPg = response.data;

                for (i = 0; i < $scope.ArticleListPg.length; i++) {
                    MyDate_String_Value = $scope.ArticleListPg[i].create_date;

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


                    $scope.ArticleListPg[i].create_date = dat;
                    //

                    MyDate_String_Value = $scope.ArticleListPg[i].valid_from;

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


                    $scope.ArticleListPg[i].valid_from = dat;

                    //

                    MyDate_String_Value = $scope.ArticleListPg[i].valid_to;

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


                    $scope.ArticleListPg[i].valid_to = dat;

                }



                console.log($scope.ArticleListPg)
            })


        // Edit Function
        $scope.editModal = function (id, $event) {

            $event.preventDefault();

            var req = JSON.stringify({ aid: id });
            //Master List

            $http.post("/ArticleMaster/GetArticleByID", req)
                .then(function (response) {
                    console.log(response.data)
                    $scope.articleID = response.data[0].article_id;
                    $scope.articleName = response.data[0].article_name;
                    $scope.articleCategory = response.data[0].article_category;
                    $scope.imgpath = response.data[0].image;
                    $scope.articleContentShort = response.data[0].article_content_short;
                    $scope.articleContent = response.data[0].article_content;
                    $scope.language = response.data[0].language;
                    $scope.isActive = response.data[0].is_active;
                    $scope.author = response.data[0].author;
                    //$scope.validFrom = response.data[0].valid_from;
                    //$scope.validTo = response.data[0].valid_to;

                })
           
        }
        // Delete All Function
        $scope.deleteModal = function (id, index) {
            var req = JSON.stringify({ aid: id });
            $http.post("/ArticleMaster/DeleteArticleByID", req)
                .then(function (response) {
                })

            $scope.ArticleListPg.splice(index, 1);

        }

        // Update Games Function
        $scope.updateArticle = function () {
            $scope.ArticleUpdateList = [];

            $scope.loading = true;

            article_id = $scope.articleID;
            article_name = $scope.articleName;
            article_category = $scope.articleCategory;
            image = $scope.imgpath;
            is_active = $scope.isActive;
            article_content_short = $scope.articleContentShort;
            article_content = $scope.articleContent;
            language = $scope.language;
            author = $scope.author;
            //valid_from = $scope.validFromToUpd;
            //valid_to = $scope.validToToUpd;
            

            //$scope.loading2 = true;

            $scope.ArticleUpdateList.push({
                article_id: article_id,
                article_name: article_name,
                article_category: article_category,
                image: image,
                article_content_short: article_content_short,
                article_content: article_content,
                language: language,
                is_active: is_active,
                author: author
                //valid_from: valid_from,
                //valid_to: valid_to
            });

            json = $scope.ArticleUpdateList;
            j = JSON.stringify(json);
            /*
           desc = $scope.description;
           console.log(desc);
           */

            $http.post("/ArticleMaster/UpdateArticle", j)
                .then(function (response) {


                    $scope.ArticleUpdateList = [];
                    alert("Game is Updated")
                    window.location.reload();

                    $scope.loading = false;
                }),
                function (error, status) {
                    $scope.message = error.error;
                };


        }

    }])
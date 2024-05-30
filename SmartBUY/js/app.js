let SmartBuyApp = angular.module("SmartBuyApp", ["SmartBuyCtrl","SmartBuyfilters","ngRoute","ngSanitize","ngQuill",]);

SmartBuyApp.config([
  "$routeProvider",
  "ngQuillConfigProvider",
  function ($routeProvider, ngQuillConfigProvider) {
    ngQuillConfigProvider.set();

    $routeProvider
      .when("/", {
        templateUrl: "./components/about.html",
        controller: "aboutCtrl",
      })
      .when("/categories", {
        templateUrl: "./components/categories.html",
        controller: "categoriesCtrl",
      })
      .when("/phones", {
        templateUrl: "./components/phones.html",
        controller: "phoneListCtrl",
      })
      .when("/phones/new", {
        templateUrl: "./components/NewPhone.html",
        controller: "PhoneAddCtrl",
      })
      .when("/phones/details/:id", {
        templateUrl: "./components/phonedetail.html",
        controller: "phoneDetailCtrl",
      })
      .when("/phones/edit/:id", {
        templateUrl: "./components/phoneedit.html",
        controller: "phoneEditCtrl",
      })
      .otherwise({ templateUrl: "./components/404.html" });
  },
]);

SmartBuyApp.run(function ($rootScope, $http, $location) {
  $http.get("json/about.json").then(function (res) {
    $rootScope.aboutData = res.data;
  });
  $http.get("json/categories.json").then(function (res) {
    $rootScope.categories = res.data;
  });
  $http.get("json/phones.json").then(function (res) {
    $rootScope.phones = res.data;
  });

  $rootScope.$on("$locationChangeSuccess", function () {
    console.log($location.path());
    $rootScope.page = $location.path();
  });
});

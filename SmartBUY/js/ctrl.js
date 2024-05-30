let SmartBuyCtrl = angular.module("SmartBuyCtrl", []);

SmartBuyCtrl.controller("aboutCtrl", function ($scope, $rootScope) {
  $scope.about = $rootScope.aboutData.about;
})
  .controller("categoriesCtrl", function ($scope, $rootScope) {
    $scope.orderByField = "title";
    $scope.reverseOrder = false;
    $scope.customOrderBy = (field) => {
      $scope.orderByField = field;
      $scope.reverseOrder = !$scope.reverseOrder;
    };
    $scope.searchType = "title";
    $scope.searchText = "";
    $scope.newCategory = {};
    $scope.addNewCategory = () => {
      $scope.newCategory.id =
        Math.max.apply(
          Math,
          $rootScope.categories.map(function (category) {
            return category.id;
          })
        ) + 1;
      $scope.newCategory.date = formatDate(new Date());
      function formatDate(date) {
        return date.toLocaleDateString('en-US', {
          day: "2-digit",
          month: "long",
          year: "numeric"
        });
      }
      $rootScope.categories.push($scope.newCategory);
      $scope.newCategory = {};
    };
    $scope.selectedCategory = {};
    $scope.selectCategory = (id) => {
      let category = $rootScope.categories.find((category) => {
        return category.id == id;
      });
      $scope.selectedCategory.id = category.id;
      $scope.selectedCategory.title = category.title;
      $scope.selectedCategory.date = category.date;
    };
    $scope.updateCategory = () => {
      let index = $rootScope.categories.findIndex((category) => {
        return category.id == $scope.selectedCategory.id;
      });
      $rootScope.categories.splice(index, 1, $scope.selectedCategory);
      $scope.selectedCategory = {};
    };
    $scope.deleteCategory = () => {
      let index = $rootScope.categories.findIndex((category) => {
        return category.id == $scope.selectedCategory.id;
      });
      $rootScope.categories.splice(index, 1);
      $scope.selectedCategory = {};
    };
  })
  .controller("phoneListCtrl", function ($scope, $rootScope) {
    $scope.orderByField = "title";
    $scope.reverseOrder = false;
    $scope.customOrderBy = (field) => {
      $scope.orderByField = field;
      $scope.reverseOrder = !$scope.reverseOrder;
    };
    $scope.searchType = "title";
    $scope.searchText = "";

    $scope.selectedPhone = {};
    $scope.selectPhone = (id) => {
      let phone = $rootScope.phones.find((phone) => {
        return phone.id == id;
      });
      $scope.selectedPhone.id = phone.id;
      $scope.selectedPhone.title = phone.title;
    };
    $scope.deletePhone = () => {
      let index = $rootScope.phones.findIndex((phone) => {
        return phone.id == $scope.selectedPhone.id;
      });
      $rootScope.phones.splice(index, 1);
      $scope.selectedPhone = {};
    };
  })
  .controller("PhoneAddCtrl", function ($scope, $rootScope, $location) {
    if (!$rootScope.phones) {
      $rootScope.phones = [];
    }
    var newphoneId = $rootScope.phones.length + 1;
    $scope.addphone = function () {
      var newphone = {
        id: newphoneId,
        title: $scope.title,
        launchOn: $scope.launchOn,
        catagories: $scope.catagories,
        img: $scope.img,
        shortContent: $scope.shortContent,
        content: $scope.content,
        price: $scope.price,
        Highlights1: $scope.ram,
        Highlights2: $scope.rom,
        Highlights3: $scope.processor
      };
      $rootScope.phones.push(newphone);
      $location.path("/phones");
    };
    $scope.submitForm = function () {
      $scope.addphone();
    };
  })
  .controller("phoneDetailCtrl",
    function ($scope, $rootScope, $routeParams, $http, $location) {
      $scope.phoneId = $routeParams.id;
    })
  .controller("phoneEditCtrl",
    function ($scope, $rootScope, $routeParams, $http, $location) {
      $scope.phoneId = $routeParams.id;
      $scope.updatephone = function () {
        var index = $rootScope.phones.findIndex(function (phone) {
          return phone.id == $scope.phoneId;
        });
        $rootScope.phones[index] = {
          id: $scope.phoneId,
          title: $rootScope.phones[index].title,
          launchOn: $rootScope.phones[index].launchOn,
          catagories: $rootScope.phones[index].catagories,
          img: $rootScope.phones[index].img,
          shortContent: $rootScope.phones[index].shortContent,
          content: $rootScope.phones[index].content,
          price: $rootScope.phones[index].price,
        };
        $location.path('/phones');
      };
      $scope.submitForm = function () {
        $scope.updatephone();
      };
    });

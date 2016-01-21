'use strict';
/**
  * controller for User Profile Example
*/
app.controller('UserCtrl', ["$scope", "flowFactory", "$rootScope", function ($scope, flowFactory, $rootScope) {
    $scope.removeImage = function () {
        $scope.noImage = true;
    };
    $scope.obj = new Flow();

    $scope.business_name = $rootScope.user.name;

    $scope.userInfo = {
        email: $rootScope.user.email,
        tabbs_number: $rootScope.user.number, 
    };



}]);




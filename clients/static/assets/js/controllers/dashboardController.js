'use strict';
/**
  * controller for angular-aside
*/

app.controller('dashboardController', ["$scope", "dashboardFactory", function ($scope, dashboardFactory) {
    dashboardFactory.get_socket_id(function(data){
        console.log("DASHBOARD CONTROLLER:", data);
        $scope.socketid = data.session.socket_id;
        $scope.loggedin_user = data.user
    })
}])

// Controller for the graphs on the top of the dashboard with the title
app.controller('SparklineCtrl', ["$scope", function ($scope) {
    $scope.sales = [600, 600, 482, 600, 490, 600, 23];
    $scope.earnings = [400, 650, 886, 443, 502, 412, 353];
    $scope.referrals = [4879, 6567, 5022, 5890, 9234, 7128, 4811];
}]);





app.factory('dashboardFactory', function($http){
    var factory = {};

    factory.get_socket_id = function(callback){
        $http.get('/dashboard').success(function(result){
            callback(result);
        })
    }
    return factory;
})

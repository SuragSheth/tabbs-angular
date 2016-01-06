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


app.factory('dashboardFactory', function($http){
    var factory = {};

    factory.get_socket_id = function(callback){
        $http.get('/dashboard').success(function(result){
            callback(result);
        })
    }
    return factory;
})

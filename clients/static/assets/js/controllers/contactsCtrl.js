//Start: Add & Manage Employees =================================

app.controller('contactsCtrl', ['$scope', 'ContactsFactory', '$location', '$rootScope', 'tabbsFactory', 'socket', function($scope, ContactsFactory, $location, $rootScope, tabbsFactory, socket){
  
  socket.on("user_to_business", function(data){
      tabbsFactory.all_tabb_messages($rootScope.user, function(data){
        $scope.contacts = data;
      })
  });
  tabbsFactory.all_tabb_messages($rootScope.user, function(data){
        $scope.contacts = data;
      })
}]);

app.factory('ContactsFactory', function($http){
  var factory = {};

  factory.getAllContacts = function(userInfo, callback){
    $http.get("/get_all_contacts/"+userInfo.number).success(function(output){
      callback(output);
    })
  };

  return factory;
})




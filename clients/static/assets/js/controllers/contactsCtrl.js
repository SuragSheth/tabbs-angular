//Start: Add & Manage Employees =================================

app.controller('contactsCtrl', ['$scope', 'ContactsFactory', '$location', '$rootScope', 'tabbsFactory', function($scope, ContactsFactory, $location, $rootScope, tabbsFactory){

  tabbsFactory.all_tabb_messages($rootScope.user, function(data){
    console.log("all messages in contacts controller", data)
    $scope.contacts = data;
  })


}])

app.factory('ContactsFactory', function($http){
  var factory = {};

  factory.getAllContacts = function(userInfo, callback){
    console.log("ITTTTSSS INNNN", userInfo);
    $http.get("/get_all_contacts/"+userInfo.number).success(function(output){
      console.log("in factory", output);
      callback(output);
    })
  };

  return factory;
})




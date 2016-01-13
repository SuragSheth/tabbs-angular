//Start: Add & Manage Employees =================================

app.controller('contactsCtrl', ['$scope', 'ContactsFactory', '$location', '$rootScope', function($scope, ContactsFactory, $location, $rootScope){
  ContactsFactory.getAllContacts($rootScope.user, function(data){
    console.log(data);
    $scope.contacts = data;
  });


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




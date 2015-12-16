//Start: Add & Manage Employees =================================

app.controller('employeeCtrl', ['$scope', 'employeeFactory', '$location', '$rootScope', function($scope, employeeFactory, $location, $rootScope){
  $scope.addEmployee = function(isValid) {
      if (isValid) { 
          alert('our form is amazing');
      }
      var newemployee_repack = {
          email: $scope.add_employee.email,
          password: $scope.add_employee.password,
          first: $scope.add_employee.first_name,
          last: $scope.add_employee.last_name,
          phone: $scope.add_employee.phone
      };
      console.log(newemployee_repack);
      // employeeFactory.addEmployee(newemployee_repack, function(data){
      //     alert(reponse recieved);   
      // }

  }

}])

app.factory('employeeFactory', function($http){
  var factory = {};
  factory.new = function(business_info, callback){
    console.log("inside businessFactory", business_info);
    $http.post('/business/new', business_info).success(function(output){
      callback(output);
    })
  }
  factory.login = function(business_info, callback) {
    console.log("inside businessfactory login", business_info);
    $http.post('/business/login', business_info).success(function(output){
      callback(output);
    })
  }

  return factory;
})

//End: Business controller and factory =================================



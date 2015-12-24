//Start: Add & Manage Employees =================================

app.controller('employeeCtrl', ['$scope', 'EmployeeFactory', '$location', '$rootScope', function($scope, EmployeeFactory, $location, $rootScope){

  $scope.addEmployee = function(isValid) {
      // if (isValid) { 
      //     alert('our form is amazing');
      // }
      console.log("___________rootscop user", $rootScope.user)

      var newemployee_repack = {
          admin: $rootScope.user.id,
          email: $scope.add_employee.email,
          password: $scope.add_employee.password,
          first: $scope.add_employee.first_name,
          last: $scope.add_employee.last_name,
          phone: $scope.add_employee.phone
      };

      console.log(newemployee_repack);
      EmployeeFactory.addEmployee(newemployee_repack, function(data){
        // load them back into scope in the navbar and also the table      
      })
  }

  $scope.deleteEmployee = function(employee){
    EmployeeFactory.deleteEmployee(employee, function(data){
      // load new list them back into scope in the navbar and also the table.
    })
  }

}])

app.factory('EmployeeFactory', function($http){
  var factory = {};

  factory.addEmployee = function(employee_info, callback){
    console.log("inside employee factory", employee_info);
    $http.post("/add_employee", employee_info).success(function(output){
      callback(output);
    })
  }

   factory.deleteEmployee = function(info, callback) {
      $http.post("/delete_employee", info).success(function(output){
          callback(output);
      })    
    };
  





  return factory;
})

//End: Business controller and factory =================================



//Start: Add & Manage Employees =================================

app.controller('employeeCtrl', ['$scope', 'EmployeeFactory', '$location', '$rootScope', function($scope, EmployeeFactory, $location, $rootScope, toaster) {


  EmployeeFactory.getAllEmployees($rootScope.user, function(data) {
    $scope.employees = data;
  });

  $scope.addEmployee = function(isValid) {
    var newemployee_repack = {
      admin: $rootScope.user.id,
      email: $scope.add_employee.email,
      password: $scope.add_employee.password,
      first: $scope.add_employee.first_name,
      last: $scope.add_employee.last_name,
      position: $scope.add_employee.position,
      phone: $scope.add_employee.phone
    };
    console.log("NEW EMPLOYEE PACKAGE", newemployee_repack);

    EmployeeFactory.addEmployee(newemployee_repack, function(data) {
    });
    EmployeeFactory.getAllEmployees($rootScope.user, function(data) {
      $scope.employees = data;
    });
  };

  $scope.deleteEmployee = function(employee) {
    console.log(employee);
    EmployeeFactory.deleteEmployee(employee, function(data) {
      EmployeeFactory.getAllEmployees($rootScope.user, function(data) {
        $scope.employees = data;
      });
    });
  };

}]);

app.factory('EmployeeFactory', function($http) {
  var factory = {};

  factory.addEmployee = function(employee_info, callback) {
    console.log("inside employee factory", employee_info);
    $http.post("/add_employee", employee_info).success(function(output) {
      callback(output);
    });
  };

  factory.getAllEmployees = function(userInfo, callback) {
    $http.get("/get_all_employees/" + userInfo.id).success(function(output) {
      callback(output);
    });
  };

  factory.deleteEmployee = function(employee_info, callback) {
    $http.post("/delete_employee", {employee_id: employee_info}).success(function(output) {
      callback(output);
    });
  };

  return factory;
});
//End: Business controller and factory =================================

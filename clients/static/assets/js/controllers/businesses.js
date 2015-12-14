//Start: Business controller and factory =================================

app.controller('businessCtrl', ['$scope', 'businessFactory', '$location', '$rootScope', function($scope, businessFactory, $location, $rootScope){
  $scope.signup_business = function(business_info){
    console.log("Business controller:", business_info);
    businessFactory.new(business_info, function(data){
      console.log("callback business controller signup");
      $rootScope.user = {
        name: data.local.name,
        email: data.local.email
      }
      $location.path('/dashboard');
    })
  }
   $scope.login_business = function(business_info){
    console.log("business controller login:", business_info);
    businessFactory.login(business_info, function(data){
      console.log("callback business controller login", data);
      $rootScope.user = {
        name: data.local.name,
        email: data.local.email
      }
      $location.path('/dashboard');
    })
  }

}])

app.factory('businessFactory', function($http){
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



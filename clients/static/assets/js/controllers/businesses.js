//Start: Business controller  =================================

app.controller('businessCtrl', ['$scope', 'businessFactory', '$location', '$rootScope', function($scope, businessFactory, $location, $rootScope){
  $scope.signup_business = function(business_info){
    console.log("Business controller:", business_info);
    businessFactory.new(business_info, function(data){
      $rootScope.user = {
        name: data.local.name,
        email: data.local.email
      };
      $location.path('/app/dashboard');
    });
  };
   $scope.login_business = function(business_info){
    businessFactory.login(business_info, function(data){

      console.log("callback business controller login", data);

      $rootScope.user = {
        id: data.user._id,
        number: data.user.local.number,
        name: data.user.local.name,
        email: data.user.local.email,
        account_type: data.user.local.accounttype
      };

      console.log("rootscope of user logged in user", $rootScope.user);
      $location.path('/app/dashboard');
    });
  };

  $scope.logOutUser = function(){
    console.log("hit the controller");
    businessFactory.logout(function(data){
      $location.path('/login');
    });
  };

  // businessFactory.get_socket_id($rootScope.user, function(data){
  //   console.log("GOT THE ID", data);
  // })

}]);
//End: Business controller =================================

//Start: Business Factory =================================
app.factory('businessFactory', function($http){
  var factory = {};
  factory.new = function(business_info, callback){
    $http.post('/business/new', business_info).success(function(output){
      callback(output);
    });
  };
  factory.login = function(business_info, callback) {
    $http.post('/business/login', business_info).success(function(output){
      callback(output);
    });
  };

  factory.logout = function(callback) {
    console.log("factory hit");
    $http.get("/logout").success(function(status){
      callback(status);
    });
  };
  // factory.get_socket_id = function(rootscope_user, callback){
  //   console.log(rootscope_user.user)
  //   // $http.get('/test').success(function(output){
  //   // })
  // }

  return factory;
});

//End: Business Factory =================================

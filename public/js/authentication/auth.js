angular.module('TimeCoordinator.Auth', [])
.controller('AuthController', ['$scope', '$rootScope', '$location', '$http' ,'$cookieStore', '$state', function($scope, $rootScope, $location, $http, $cookieStore, $state){
  $scope.user = {};
  $scope.login = function(){
    $http.post('/login', {
      email: $scope.user.local.email,
      password: $scope.user.local.password
    })
    .success(function(user){
      $rootScope.message = 'Authentication Successful!';
      $cookieStore.put(user);
      $state.go('upcomingmeetings');
      
    })
    .error(function(){
      $rootScope.message = 'Authentication Failed!';
      $state.go('login');
    });
  };
}]);
angular.module('TimeCoordinator.Auth', [])
.controller('AuthController', ['$scope', '$rootScope', '$location', '$http' ,'$rootScope', '$state', function($scope, $rootScope, $location, $http, $rootScope, $state){
  $scope.user = {};
  $scope.login = function(){
    $http.post('/login', {
      username: $scope.user.username,
      password: $scope.user.password
    })
    .success(function(user){
      $rootScope.message = 'Authentication Successful!';
      $state.go('profile');
      
    })
    .error(function(){
      $rootScope.message = 'Authentication Failed!';
      $state.go('login');
    });
  };
}]);
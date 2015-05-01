angular.module('TimeCoordinator.Auth', [])
.controller('AuthController', ['$scope', '$state', 'AuthService', function($scope, $state, AuthService){
  $scope.buttonText = 'Login';
  
  $scope.login = function() {
    $scope.buttonText = 'Logging In...';
    AuthService.login($scope.credentials.email, $scope.credentials.password).then(function(data) {
      $state.go('upcomingmeetings');
    }, function(err) {
      $scope.invalidLogin = true;
    }).finally(function() {
      $scope.buttonText = 'Login';
    });
  };

  $scope.signUp = function() {
    $scope.buttonText = 'Signing up...';
    AuthService.signup($scope.credentials.email, $scope.credentials.password),then(function(data) {
      $state.go('upcomingmeetings');
    }, function(err) {
      $scope.invalidLogin = true;
    }).finally(function() {
      $scopt.buttonText = 'Login';
    });
  };
}]);

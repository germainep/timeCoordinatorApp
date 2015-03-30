angular.module('UserModule', [ ])
  .controller('UserController', ['$http', '$scope', 'User', function($http, $scope, User) {
    $http.get('/profile/user')
    .success(function(data, status, headers, config) {
      $scope.user = data;
      $scope.usermeetings = data.meetings;
      $scope.error = '';
    })
    .error(function(data) {
      $scope.user = {};
      $scope.error = data;
    });
  }]);
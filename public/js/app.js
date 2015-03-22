angular.module('myApp', ['ui.router'])
  .controller('userController', ['$http', '$scope', function($http, $scope) {
    $http.get('/profile/user')
      .success(function(data, status, headers, config) {
      $scope.user = data;
      $scope.error = ' ';
    })
      .error(function(data, status, headers, config) {
      $scope.user = {};
      $scope.error = data;
    });
  }]);
angular.module('TimeCoordinator.Users', [])
.controller('UserController', ['$scope', 'ActiveUser', function($scope, ActiveUser) {
  var activeuser = window.user;
  
  $scope.user = ActiveUser.get({user_id: activeuser});
}]);

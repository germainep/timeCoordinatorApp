angular.module('UserModule', [ ])
  .controller('UserController', ['$http', '$scope', 'User', function($http, $scope, User, Meeting) {
    var user = User.get({id: '@_id'});
    $scope.user = user;
    
    console.log($scope.user);
  }])

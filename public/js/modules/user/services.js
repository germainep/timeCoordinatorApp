angular.module('UserModuleServices', [])
  .factory('User', ['$resource', function($resource) {
    return $resource('/profile/user')
  }]);
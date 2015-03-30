angular.module('User.module.services', [])
//factory to see and the current users profile
  .factory('User', function($resource) {
    return $resource('/profile/user')
  });
//factory for displaying contact info of other users in the meeting
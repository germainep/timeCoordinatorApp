angular.module('UserModule', [])
  .controller('UserController', ['$http', '$scope', 'User', 'Meeting', '$state', '$stateParams', function($http, $scope, User, Meeting, $state, $stateParams) {
  var ids;
  var usermeetings 
  
    
    var user = User.get(function(){
      $scope.user = user;
      ids = user.meetings
      var meetings = Meeting.get({id: '55117afe5b8528b0207a9083'});
      console.log(ids); 
      console.log(meetings)
    });
  }]);

angular.module('MeetingModule', [])

.controller('MeetingController', ['$scope', '$http', 'Meeting', 'User', function($scope, $http, Meeting, User) {
  var params = "55117afe5b8528b0207a9083";
  var meeting = Meeting.get({id: params}, function() {
   console.log(meeting);
 });
  var meetings = Meeting.query(function() {
    console.log(meetings);
  });
}]);

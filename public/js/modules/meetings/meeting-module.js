angular.module('MeetingModule', [])
.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $stateProvider
    .state('meetings', {
    templateUrl: 'js/modules/meetings/views/create-meeting.html',
    controller: 'MeetingController'
  })
}])

.controller('MeetingController', ['$scope', '$http', function($scope, $http) {
  $http.get('/api/meetings')
    .success(function(data, status, headers, config) {
      $scope.meeting = data;
      $scope.error = ' ';
    })
    .error(function(data, status, header, config) {
      $scope.meeting = { };
      $scope.error = data;
    });
}]);
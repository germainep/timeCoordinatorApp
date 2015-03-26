angular.module('MeetingModule', [])

.controller('MeetingController', ['$scope', '$http', function($scope, $http) {
  $http.get('/api/meetings')
    .success(function(data, status, headers, config) {
      $scope.meetings = data;
      $scope.error = ' ';
    })
    .error(function(data, status, header, config) {
      $scope.meetings = { };
      $scope.error = data;
    });
}]);

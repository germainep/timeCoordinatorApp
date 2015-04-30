angular.module('TimeCoordinator.Availability',[])
.controller('AvailabilityController',['Avail', 'Meetings', '$scope', '$stateParams', function(Avail, Meetings, $scope, $stateParams) {
  
  $scope.newavailability = new Avail();
  $scope.saveAvail = function() {
    $scope.newavailability.start = new Date();
    $scope.newavailability.$save({meetingid: $stateParams.id});
  };
  
}]);
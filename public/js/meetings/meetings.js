/*jshint devel: true*/
/*globals angular, window*/
angular.module('TimeCoordinator.Meetings', [])
  .controller('MeetingController', ['$scope', '$state', '$stateParams', 'Meetings', 'popupService', function($scope, $state, $stateParams, Meetings, popupService) {
  $scope.meetings = Meetings.query();
    
    
    $scope.deleteMeeting = function(meeting) {
      if(popupService.showPopup('Really delete this?')){
        meeting.$delete(function(){
          $state.go('upcomingmeetings', undefined, {updated: true});
        });
      }
    };
  

    
}])

.controller('SingleMeetingController', ['$scope', '$stateParams', 'Meetings', function($scope, $stateParams, Meetings) {
  Meetings.get({id: $stateParams.id}, function(data){
    $scope.singlemeeting = data;
    console.log(data.participants);
    $scope.participants = data.participants;
  });
}])

.controller('CreateMeetingController', ['$scope', '$state', 'Meetings', function($scope, $state, Meetings){
  $scope.newmeeting = new Meetings();
  $scope.buttonText = 'Create';
  $scope.saveMeeting = function() {
    $scope.buttonText = 'Saving. . .';
    $scope.newmeeting.$save(function(){
      $state.go('upcomingmeetings');
    });
  };
}]);
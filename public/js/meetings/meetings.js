/*jshint devel: true*/
/*globals angular, window*/
angular.module('TimeCoordinator.Meetings', [])
  .controller('MeetingController', ['$scope', '$state', '$stateParams', 'Meetings', 'popupService', function($scope, $state, $stateParams, Meetings, popupService) {
  $scope.meetings = Meetings.query();
    
    
    $scope.deleteMeeting = function(meeting) {
      if(popupService.showPopup('Really delete this?')){
        meeting.$delete(function(){
          for (var i in $scope.meetings) {
            if ($scope.meetings[i] === meeting) {
              $scope.meetings.splice(i, 1);
            }
          }
          $state.go('upcomingmeetings', undefined, {updated: true});
        });
      }
    };
  

    
}])

.controller('SingleMeetingController', ['$scope', '$stateParams', 'Meetings', function($scope, $stateParams, Meetings) {
  Meetings.get({id: $stateParams.id}, function(data){
    $scope.singlemeeting = data;
    $scope.participants = data.participants;
  });
  $scope.editmode = false;
  $scope.toggleEditMode = function(){
    $scope.editmode = $scope.editmode === false ? true: false;
    if($scope.editmode === false){
    }
  };
  $scope.update = function(meeting) {
    meeting.$update(function() {
      
    }, function(errorResponse) {
      $scope.error = errorResponse.data.message;
    });
  };
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
}])
.controller('UpdateMeetingController', ['$scope', '']);
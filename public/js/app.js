angular.module('TimeCoordinator', [
  'ui.router', 
  'ngResource',
  'TimeCoordinator.Users',
  'TimeCoordinator.Meetings',
  'TimeCoordinator.directives'
])
.run(['$state', function($state) {
  $state.go('upcomingmeetings');
}])

.config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
  $stateProvider
    .state('upcomingmeetings', {
    url: '/meetings',
    templateUrl: 'partials/viewmeetings.jade',
    controller: 'MeetingController',
    params: {
      updated: false
    }
    })
    .state('singlemeeting', {
    url: '/meetings/:id',
    templateUrl: 'partials/singlemeeting.jade',
    controller: 'SingleMeetingController'
    
  })
  .state('createmeetings', {
    url: '/meeting/create',
    templateUrl: '/partials/createmeeting.jade',
    controller: 'CreateMeetingController'
  });
}]);
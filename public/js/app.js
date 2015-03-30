angular.module('timeApp', [
  'ui.router', 
  'ngResource', 
  'UserModule', 
  'MeetingModule', 
  'UserModuleServices', 
  'MeetingModuleServices'])

  .run(['$state', function($state) {
    $state.go('upcomingmeetings');
  }])

  .config(['$stateProvider', '$locationProvider', function($stateProvider, $locationProvider) {
    $stateProvider
      .state('createmeetings', {
      templateUrl: 'js/modules/meetings/views/create-meeting.html'
    })
    .state('upcomingmeetings', {
      url: '/meetings',
      templateUrl: 'js/modules/user/views/view-meetings.html'
    })
    .state('singlemeeting', {
      url: '/meetings/:id',
      templateUrl: 'js/modules/meetings/views/single-meeting.html'
      
    });

  }]);

angular.module('MeetingModuleServices', [])
  .factory('Meeting', ['$resource', function($resource) {
    return $resource('/api/meetings/:id')
  }]);
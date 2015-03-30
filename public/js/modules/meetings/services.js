angular.module('Meeting.module.services', [])
.factory('Meeting',['$resource',  function($resource) {
  return $resource('/api/meetings/:id', {id: '@_id'},{
    update: {method: 'PUT'}
  });
}])

.service('popupService', ['$window', function($window) {
  this.showPopup = function(message){
    return $window.confirm(message);
  }
}]);


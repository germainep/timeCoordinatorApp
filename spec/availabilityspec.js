beforeEach(module('TimeCoordinator.Meetings'));
beforeEach(module('TimeCoordinator.Users'));
beforeEach(module('TimeCoordinator.Availability'));
beforeEach(module('ngResource'));
beforeEach(module('ui.router'));
describe('TimeCoordinator.Availibility', function () {
  var $httpBackend;
  beforeEach(inject(function(_$httpBackend_) {
    $httpBackend = _$httpBackend_;
    
    $httpBackend.expectGET('/api/meetings/availability').respond([{username: "Germaine", _id: 1},{username: 'Jim', _id: 2}]);
  }));
  
  it('should show two items', inject(function($rootScope, $controller, Avail) {
    var $scope= $rootScope.$new;
    $controller('AvailabilityController', {$scope: $scope, Avail: Avail});
    
    $httpBackend.flush();
    expect($scope.availability.length).toBe(2);
    
  }));
});
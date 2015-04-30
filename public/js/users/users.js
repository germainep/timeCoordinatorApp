angular.module('TimeCoordinator.Users', [])
.controller('UserController', ['$scope', '$rootScope', '$modal', '$log', 'ActiveUser', function($scope, $rootScope, $modal, $log, ActiveUser) {
  var user_id = $rootScope.user;
  ActiveUser.get({user_id: user_id}, function(data){
    $scope.user = data;
    console.log(data.name);
    console.log(data.local);
  });
  
  $scope.open = function () {

    var modalInstance = $modal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: 'lg',
      resolve: {
        user: function () {
          return $scope.user;
        }
      }
    });

    modalInstance.result.then(function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
}])

.controller('ModalInstanceCtrl', function ($scope, $modalInstance, user) {
  
  $scope.user = user;
  $scope.addLocal = function () {
    $modalInstance.close($scope.user.$update(function(){
      
    }));
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
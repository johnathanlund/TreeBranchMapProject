angular.module('mapFavApp').controller('loginCtrl', function ($scope, loginService, $state) {
  $scope.login = function() {
    loginService.login($scope.credentials).then(function(response) {
      $state.go('profile');
    });
  };

  $scope.register = function() {
    loginService.register($scope.newUser).then(function(response) {
      console.log(response.data);
      $state.go('login');
    });
  };

});

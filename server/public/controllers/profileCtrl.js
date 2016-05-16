angular.module("mapFavApp").controller("profileCtrl", function($scope, loginService, user, $state) {

  $scope.user = user;
  $scope.logout = function () {
    loginService.logout().then(function(response) {
      $state.go('login');
    });
  };

});

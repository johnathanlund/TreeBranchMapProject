angular.module('mapFavApp').controller('loginCtrl', function ($scope, loginService, $state) {
  $scope.login = function() {
    loginService.login($scope.credentials).then(function(response) {
      console.log(response.data);
      console.log("login response recieved from server, trying to send to profilePage");
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

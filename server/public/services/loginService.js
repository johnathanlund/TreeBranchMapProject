angular.module('mapFavApp').service('loginService', function ($http) {
  this.register = function(user) {
    return $http({
      method: 'POST',
      url: '/user',
      data: user
    }).then(function(response) {
      return response;
    });
  };

  this.login = function(user) {
    console.log("reaching loginService login func");
      return $http({
        method: 'POST',
        url: '/login',
        data: user
      }).then(function(response) {
        return response;
      });
    };

    this.getCurrentUser = function() {
      return $http({
        method: 'GET',
        url: '/getCurrentUser'
      }).then(function(response) {
        return response;
      });
    };

    this.logout = function() {
      return $http({
        method: 'GET',
        url: '/logout',
      }).then(function(response) {
        return response;
      });
    };
});

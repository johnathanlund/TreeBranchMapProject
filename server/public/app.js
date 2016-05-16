angular.module('mapFavApp', ['ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {

      $stateProvider
      .state('home', {
        url: "/homePage",
        templateUrl: "./templates/homePage.html"
      })
      .state('login', {
        url: "/loginPage",
        templateUrl: "./templates/loginPage.html",
        controller: 'loginCtrl'
      })
      .state('register', {
        url: "/loginPage/register",
        templateUrl: "./templates/registerPage.html",
        controller: 'loginCtrl'
      })
      .state('profile', {
      url: "/profile",
      templateUrl: "./templates/profilePage.html",
      controller: 'profileCtrl',
      resolve: {
        user: function(loginService, $state) {
          console.log("resolving user data");
          return loginService.getCurrentUser().then(function(response) {
            console.log(response.data);
            console.log("profile successfully reached");
            return response.data;
          }).catch(function(err) {
            console.log('Error for page access', err);
            alert('ACCESS DENIED. Your not logged in.');
            $state.go('login');
          });
        }
      }
    });

  $urlRouterProvider.otherwise('/homePage');
});

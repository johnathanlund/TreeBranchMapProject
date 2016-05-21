angular.module('mapFavApp')
.directive('customMap', function() {
  return {
    restrict: "AE",
    templateUrl: './templates/customMap.html',
    controller: "mapCtrl"
  }
})
.directive('navMenu', function() {
  return {
    restrict: "AE",
    templateUrl: './templates/navMenu.html',
    controller: function () {
      $('#menu-icon').on('click', function () {
        $('#nav-menu').toggle({
          duration: 1500,
        specialEasing: {
          width: "easeOutElastic",
          height: "easeInCirc",
          display: "flex",
        }});
      });

    }
  }
})

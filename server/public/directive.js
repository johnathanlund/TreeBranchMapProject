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
      var lastScrollTop = 0;
      $(document).on('scroll', function () {
          var st = $(this).scrollTop();
          if (st > lastScrollTop) {
              $('.navBar-container').slideUp(500);
          } else {
              $('.navBar-container').slideDown(500);
          }
          lastScrollTop = st;
      });

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

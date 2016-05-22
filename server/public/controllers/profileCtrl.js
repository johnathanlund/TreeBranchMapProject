angular.module("mapFavApp").controller("profileCtrl", function($scope, loginService, user, groupMarkerService, $state) {

// -------------User functions ----------------------------------------------
  $scope.user = user;
  $scope.logout = function () {
    loginService.logout().then(function(response) {
      $state.go('login');
    });
  };
// -------------Group List functions -----------------------------
// $scope.groupLists = {};
$scope.getGroups = function () {
  groupMarkerService.getGroups().then(function(response) {
    console.log(response);
    $scope.groups = response;
  });
};
$scope.getGroups();
$scope.addGroup = function (groupName, groupDescription) {
  var obj = {groupName: groupName, groupDescription: groupDescription};
  console.log(obj);
  groupMarkerService.addGroup(obj).then(function(response) {
    $scope.getGroups();
  });
};
$scope.groupUpdate = function (groupName, groupDescription, groupId) {
  console.log(groupId);
  var groupUpdateObj ={groupName: groupName, groupDescription: groupDescription};
  groupMarkerService.groupUpdate(groupUpdateObj, groupId).then(function(response) {
    console.log(response);
    $scope.groupLists = response;
  });
  $scope.getGroups();
};
$scope.groupDelete = function (group) {
  groupMarkerService.groupDelete(group._id).then(function(response) {
    $scope.groupLists = response;
  });
  $scope.getGroups();
};
//-------------------Marker List functions-----------------------------------
// $scope.markerLists = {};
$scope.getMarkers = function () {
  groupMarkerService.getMarkers().then(function(response) {
    console.log(response);
    $scope.markers = response;
  });
};
$scope.getMarkers();
$scope.addMarker = function (markerName, markerLat, markerLong, groupId) {
  var obj = {markerName: markerName, markerLat: markerLat, markerLong: markerLong};
  console.log(obj);
  groupMarkerService.addMarker(obj, groupId).then(function(response) {
    $scope.getGroups();
  });
};
$scope.updateMarker = function (markerList) {
  groupMarkerService.updateMarker(markerList).then(function(response) {
    $scope.markerLists = response;
  });
};
$scope.markerDelete = function (marker) {
  groupMarkerService.markerDelete(marker._id).then(function(response) {
    console.log("Deleted marker from list.");
  });
  $scope.getGroups();
};


//-----------------Other Controller functions--------------------------------

// This controls the group lists, so that when you click on a group tab, only
// that group div will show, and not all group divs. This took hours of trial &
// error, research & consulting to make seperate group divs, with matching _id from
// ng-repeat, work with just their group._id and not show all groups in the repeat.
$scope.select = function (group) {
  angular.forEach($scope.groups, function (currentGroup) {
    currentGroup.selected = currentGroup === group && !currentGroup.selected;
  });
};

var lastScrollTop = 0;
$(document).on('scroll', function () {
    var st = $(this).scrollTop();
    if (st > lastScrollTop) {
        $('.navBar').slideUp(500);
    } else {
        $('.navBar').slideDown(500);
    }
    lastScrollTop = st;
});

//     $scope.groupTabs = false;
//     $scope.groupToggle = function() {
//       $scope.groupTabs = !$scope.groupTabs;
//     };
//
// $scope.clearSearch = function() {
//   $scope.groupName = null;
//   $scope.groupDescription = null;
// };

});

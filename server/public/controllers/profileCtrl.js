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

});
//-----------------Other Controller functions--------------------------------
// $scope.addMarkersToArray = function ($scope.group.markerList) {
//   // groupMarkerService.getMarkers().then(function(response) {
//   //   console.log("addMarkersToArray: " + group.markerList);
//   //   $scope.newMarkersArray = res;
//   // });
//   console.log("Finally seeing: " + $scope.group.markerList);
// };
// $scope.clearSearch = function() {
//   $scope.groupName = null;
//   $scope.groupDescription = null;
// };

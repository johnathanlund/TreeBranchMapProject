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
    $scope.getGroups ();
  });
};
$scope.groupUpdate = function (group) {
  groupMarkerService.groupUpdate(group).then(function(response) {
    $scope.groupLists = response;
  });
};
$scope.groupDelete = function (group) {
  groupMarkerService.groupDelete(group._id).then(function(response) {
    $scope.groupLists = response;
  });
};
//-------------------Marker List functions-----------------------------------
$scope.markerLists = {};
$scope.getMarkers = function () {
  groupMarkerService.getMarkers().then(function(response) {
    $scope.markerLists = response;
  });
};
$scope.getMarkers();
$scope.addMarker = function (markerName, markerLat, markerLong) {
  var obj = {groupdName: groupName, markerLat: markerLat, markerLong: markerLong};
  console.log(obj);
  groupMarkerService.addMarker(obj).then(function(response) {
    $scope.getMarkers ();
  });
};
$scope.updateMarker = function (markerList) {
  groupMarkerService.updateMarker(markerList).then(function(response) {
    $scope.markerLists = response;
  });
};
$scope.markerDelete = function (markerList) {
  groupMarkerService.markerDelete(markerList._id).then(function(response) {
    $scope.markerLists = response;
  });
};
});
//-----------------Other Controller functions--------------------------------
$scope.clearSearch = function() {
  $scope.groupName = null;
  $scope.groupDescription = null;
};

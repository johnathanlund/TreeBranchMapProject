angular.module('mapFavApp').service('groupMarkerService', function ($http) {
  this.addGroup = function (obj) {
    return $http ({
      method: "POST",
      url: '/groupList',
      data: obj
    }).then(function (response) {
      return response.data;
    });
  };
  this.getGroups = function () {
    return $http ({
      method: "GET",
      url: '/groupList'
    }).then(function (response) {
      return response.data;
    });
  };
  this.getGroupId = function (groupList) {
    return $http ({
      method: "GET",
      url: '/groupList/' + groupList._id
    }).then(function (response) {
      return response.data;
    });
  };
  this.groupUpdate = function (obj, id) {
    return $http ({
      method: "PUT",
      url: '/groupList/' + id,
      data: obj
    }).then(function (response) {
      return response.data;
    });
  };
  this.groupDelete = function (group) {
    return $http ({
      method: "DELETE",
      url: '/groupList/' + group
    }).then(function (response) {
      return response.data;
    });
  };
  this.addMarker = function (obj, id) {
    return $http ({
      method: "POST",
      url: '/markerList/' + id,
      data: obj
    }).then(function (response) {
      return response.data;
    });
  };
  this.getMarkers = function () {
    return $http ({
      method: "GET",
      url: '/markerList'
    }).then(function (response) {
      return response.data;
    });
  };
  this.getMarkerId = function (markerList) {
    return $http ({
      method: "GET",
      url: '/markerList/' + markerList._id
    }).then(function (response) {
      return response.data;
    });
  };
  this.updateMarker = function (marker) {
    return $http ({
      method: "PUT",
      url: '/markerList/' + marker,
      data: marker
    }).then(function (response) {
      return response.data;
    });
  };
  this.markerDelete = function (marker) {
    return $http ({
      method: "DELETE",
      url: '/markerList/' + marker
    }).then(function (response) {
      return response.data;
    });
  };
});

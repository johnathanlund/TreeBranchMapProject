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
  this.groupUpdate = function (groupList) {
    return $http ({
      method: "PUT",
      url: '/groupList/' + groupList._id,
      data: marker
    }).then(function (response) {
      return response.data;
    });
  };
  this.groupDelete = function (id) {
    return $http ({
      method: "DELETE",
      url: '/groupList/' + id
    }).then(function (response) {
      return response.data;
    });
  };
  this.addMarker = function (obj) {
    return $http ({
      method: "POST",
      url: '/markerList',
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
  this.updateMarker = function (markerList) {
    return $http ({
      method: "PUT",
      url: '/markerList/' + markerList._id,
      data: marker
    }).then(function (response) {
      return response.data;
    });
  };
  this.markerDelete = function (id) {
    return $http ({
      method: "DELETE",
      url: '/markerList/' + id
    }).then(function (response) {
      return response.data;
    });
  };
});

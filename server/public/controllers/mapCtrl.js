angular.module("mapFavApp").controller("mapCtrl", function($scope, groupMarkerService){

$scope.addMarkersToArray = function (markerList) {
    $scope.newMarkersArray = markerList;
    var position = navigator.geolocation.getCurrentPosition(initMap);
  console.log("Finally seeing: " + markerList);
};

function initMap(position) {
  console.log("running map func");
  console.log(position.coords.latitude);
  var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
   var map = new google.maps.Map(document.getElementById('map'), {
     zoom: 3,
     center: coords,
    //  center: new google.maps.LatLng(48.8584,2.2945),
     mapTypeId: google.maps.MapTypeId.HYBRID
//      The following map types are available in the Maps JavaScript API:
//
// MapTypeId.ROADMAP displays the default road map view. This is the default map type.
// MapTypeId.SATELLITE displays Google Earth satellite images
// MapTypeId.HYBRID displays a mixture of normal and satellite views
// MapTypeId.TERRAIN displays a physical map based on terrain information.
   });
   var input = /** @type {!HTMLInputElement} */(
       document.getElementById('pac-input'));

   var types = document.getElementById('type-selector');
   map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
   map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);

   var autocomplete = new google.maps.places.Autocomplete(input);
   autocomplete.bindTo('bounds', map);

   var marker = new google.maps.Marker({
     map: map,
     position: coords,
     draggable: true,
     animation: google.maps.Animation.DROP,
   });
   //----------------Display Marker Array function on html click-------------------------------------------------------------------------------
if(!markersFromMarkerList){
  var markersFromMarkerList = [];
};

Array.prototype.push.apply(markersFromMarkerList, $scope.newMarkersArray);
console.log(markersFromMarkerList);
// markersFromMarkerList.push($scope.newMarkersArray);

   for (var i = 0; i < markersFromMarkerList.length; i++) {
          var data = markersFromMarkerList[i];
          console.log("data: " + data.markerName + ", " + data.markerLat + ", " + data.markerLong);
          var myLatlng = new google.maps.LatLng(data.markerLat, data.markerLong);
          var arrayMarker = new google.maps.Marker({
              position: myLatlng,
              map: map,
              title: data.markerName
          });
          var infowindow = new google.maps.InfoWindow();
              //Attach click event to the marker.
              (function (arrayMarker, data) {
                  google.maps.event.addListener(arrayMarker, "click", function (e) {
                    console.log(arrayMarker);
                    var indexArr = data.indexOf(this);
                      //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
                      // infoWindow.setContent("<div style = 'width:200px;min-height:40px'>" + data.markerName + "</div>");
                      infowindow.setContent('<div><strong>' + markersFromMarkerList[indexArr].markerName + '</strong><br>' +
                      'Lat: ' + data[indexArr].markerLat + '<br>' +
                      'Lng: ' + data[indexArr].markerLong + '</div>');
                      infoWindow.open(map, arrayMarker);
                      console.log("Marker lat:  " + arrayMarker.getPosition().lat());
                      console.log("Marker lng:  " + arrayMarker.getPosition().lng());
                  });
              })
              // (arrayMarker, data);
      };

   //-----------------------End of Display Marker Array function---------------------------------------------------------------------

   var infowindow = new google.maps.InfoWindow({content: "<p style = 'width:200px;min-height:40px;color:blue;'>Marker Location:  " + marker.position + '</p>'});
   google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
    console.log("Marker lat:  " + marker.getPosition().lat());
    console.log("Marker lng:  " + marker.getPosition().lng());
    console.log(document.getElementById("markerLat"));
  });

   autocomplete.addListener('place_changed', function() {
     infowindow.close();
     marker.setVisible(false);
     var place = autocomplete.getPlace();
     if (!place.geometry) {
       window.alert("Autocomplete's returned place contains no geometry");
       return;
     }

     // If the place has a geometry, then present it on a map.
     if (place.geometry.viewport) {
       map.fitBounds(place.geometry.viewport);
       console.log(place);
     } else {
       map.setCenter(place.geometry.location);
       map.setZoom(17);  // Why 17? Because it looks good.
     }
     marker.setIcon(/** @type {google.maps.Icon} */({
       url: place.icon,
       size: new google.maps.Size(71, 71),
       origin: new google.maps.Point(0, 0),
       anchor: new google.maps.Point(17, 34),
       scaledSize: new google.maps.Size(35, 35)
     }));
     marker.setPosition(place.geometry.location);
     marker.setVisible(true);

     var address = '';
     if (place.address_components) {
       address = [
         (place.address_components[0] && place.address_components[0].short_name || ''),
         (place.address_components[1] && place.address_components[1].short_name || ''),
         (place.address_components[2] && place.address_components[2].short_name || '')
       ].join(' ');
     }
     place.geometry.locationString = place.geometry.location.toString();

     infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
     'Lat: ' + marker.getPosition().lat() + '<br>' +
     'Lng: ' + marker.getPosition().lng() +
     '<br>' + address + '</div>');
     infowindow.open(map, marker);
   });
   google.maps.event.addListener(marker, 'click', function() {
     //-----Below two lines gets the exact latitude and longitude on the marker clicked-------------------------------------
     document.getElementById("custom-map-lat").value = marker.getPosition().lat().toString();
     document.getElementById("custom-map-lng").value = marker.getPosition().lng().toString();
   });
   google.maps.event.addListener(marker,'dragend',function(event) {
        document.getElementById('custom-map-lat').value = event.latLng.lat();
        document.getElementById('custom-map-lng').value = event.latLng.lng();
    });

   // Sets a listener on a radio button to change the filter type on Places
   // Autocomplete.
   function setupClickListener(id, types) {
     var radioButton = document.getElementById(id);
     radioButton.addEventListener('click', function() {
       autocomplete.setTypes(types);
     });
   }

   setupClickListener('changetype-all', []);
   setupClickListener('changetype-address', ['address']);
   setupClickListener('changetype-establishment', ['establishment']);
   setupClickListener('changetype-geocode', ['geocode']);

   $scope.$apply();
 }
 //--------------------End of initMap function---------------------------------------

 // To find the users location with their permission.
 if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(initMap);
} else {
  error('Geo Location is not supported');
}
//  to help with the load time for Google Maps Api
 if(google) {
   console.log("Google map api is running");
   initMap();
 } else {
   console.log("Searching for google to run func initMap");
   setInterval(initMap, 400);
 }
 // while (!google) {
 //   console.log('searching for google still.');
 //   setTimeout(initMap, 5000);
 // };

 //serialize location to string
 // var results = results.map(function(item){
 //    item.geometry.locationString = item.geometry.location.toString();
 //    return item;
 //  });

//-----------below code, attempt to display infowindow with markers displayed from groupList-----------------------------------------
 // for (var i = 0; i < markersFromMarkerList.length; i++) {
 //        var data = markersFromMarkerList[i];
 //        // console.log("data: " + data.markerName + ", " + data.markerLat + ", " + data.markerLong);
 //        var myLatlng = new google.maps.LatLng(data.markerLat, data.markerLong);
 //        var arrayMarker = new google.maps.Marker({
 //            position: myLatlng,
 //            map: map,
 //            title: data.markerName
 //        });
 //        markersFromMarkerList.push(arrayMarker);
 //        var infowindow = new google.maps.InfoWindow();
 //        //Attach click event to the marker.
 //        (function (arrayMarker, data) {
 //            google.maps.event.addListener(arrayMarker, "click", function (e) {
 //              console.log(arrayMarker);
 //              var indexArr = markersFromMarkerList.indexOf(this);
 //                //Wrap the content inside an HTML DIV in order to set height and width of InfoWindow.
 //                // infoWindow.setContent("<div style = 'width:200px;min-height:40px'>" + data.markerName + "</div>");
 //                infowindow.setContent('<div><strong>' + markersFromMarkerList[indexArr].markerName + '</strong><br>' +
 //                'Lat: ' + markersFromMarkerList[indexArr].markerLat + '<br>' +
 //                'Lng: ' + markersFromMarkerList[indexArr].markerLong + '</div>');
 //                infoWindow.open(map, arrayMarker);
 //                console.log("Marker lat:  " + arrayMarker.getPosition().lat());
 //                console.log("Marker lng:  " + arrayMarker.getPosition().lng());
 //            });
 //        })
 //        // (arrayMarker, data);
 //    };

});

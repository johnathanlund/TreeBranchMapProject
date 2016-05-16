angular.module("mapFavApp").controller("mapCtrl", function($scope){

function initMap() {
  console.log("running map func");
   var map = new google.maps.Map(document.getElementById('map'), {
     zoom: 18,
     center: {lat: 48.8584, lng: 2.2945},
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

   var infowindow = new google.maps.InfoWindow();
   var marker = new google.maps.Marker({
     map: map,
     anchorPoint: new google.maps.Point(0, -29)
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

     infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
     infowindow.open(map, marker);
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

});

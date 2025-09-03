var map = L.map('map').setView([43.4643, -80.5204], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 18
}).addTo(map);


// Localization
var x = document.getElementById("positionUser");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition,showError);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}


function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude +
    "<br>Accuracy: " + position.coords.accuracy + " meters";
  map.setView({lat: position.coords.latitude, lng: position.coords.longitude}, 16);
  var marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
  // Draw a circle with radius equal to the accuracy
  var circle = L.circle([position.coords.latitude, position.coords.longitude], {
    radius: position.coords.accuracy,
    color: '#1976d2',
    fillColor: '#1976d2',
    fillOpacity: 0.2
  }).addTo(map);
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      x.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML = "An unknown error occurred."
      break;
  }
}

// Modal Image Gallery
function onClick(element) {
  document.getElementById("img01").src = element.src;
  document.getElementById("modal01").style.display = "block";
  var captionText = document.getElementById("caption");
  captionText.innerHTML = element.alt;
}


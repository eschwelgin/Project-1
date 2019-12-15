// sandbox url https://sandbox-api.brewerydb.com/v2/
// Key:b04f7e596969ab2a01ec840dc8a0d9c0

// have to use a cors proxy to prevent cross-origin errors 
// https://cors-anywhere.herokuapp.com/
var styleId = 93 //range is 93-164
var testbeerURL = 'https://cors-anywhere.herokuapp.com/sandbox-api.brewerydb.com/v2/beers?styleId=' + styleId + '&key=b04f7e596969ab2a01ec840dc8a0d9c0&withBreweries=Y'

var userLat 
var userLng 
var testBrewURL = 'https://cors-anywhere.herokuapp.com/sandbox-api.brewerydb.com/v2/search/geo/point?lat=34.0522&lng=-118.2436&radius=100&key=b04f7e596969ab2a01ec840dc8a0d9c0' // LA, Cali

function brewCall() {
  brewURL = 'https://cors-anywhere.herokuapp.com/sandbox-api.brewerydb.com/v2//search/geo/point?lat=' + userLat + '&lng=' + userLng + '&key=b04f7e596969ab2a01ec840dc8a0d9c0'
  $.ajax({
    url: testBrewURL,
    method: "GET",
  }).then(function(response) {
    console.log(response)
  });
}

function success(pos) {
  var crd = pos.coords
  console.log('Latitude : ' + crd.latitude)
  console.log('Longitude: ' + crd.longitude)
  userLat = crd.latitude 
  userLng = crd.longitude
  brewCall()
}

function error(err) {
  console.log('ERROR(' + err.code + ":" + err.message + ')')
}

window.addEventListener("load", function () {
  navigator.geolocation.getCurrentPosition(success, error)
})
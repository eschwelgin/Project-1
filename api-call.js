var userLat
var userLng

function brewCall() {
  // brewURL = 'https://cors-anywhere.herokuapp.com/sandbox-api.brewerydb.com/v2/search/geo/point?lat=' + userLat + '&lng=' + userLng + '&radius=100&key=b04f7e596969ab2a01ec840dc8a0d9c0'
  //sub the test variable in the ajax call to get data back - I don't think the sandbox includes any cleveland breweries 
  // test1 = 'https://cors-anywhere.herokuapp.com/sandbox-api.brewerydb.com/v2/breweries?&key=b04f7e596969ab2a01ec840dc8a0d9c0'
  // test2 = "https://cors-anywhere.herokuapp.com/sandbox-api.brewerydb.com/v2/search/geo/point?lat=35.772096&lng=-78.638614&key=b04f7e596969ab2a01ec840dc8a0d9c0"

  brewURL = "https://api.openbrewerydb.org/breweries?by_city=cleveland"
  
  $.ajax({
    url: brewURL,
    method: "GET",
  }).then(function(response) {
    console.log(response)
  });
}

function success(pos) {
  var crd = pos.coords
  console.log('Lat:   ' + crd.latitude)
  console.log('Long: ' + crd.longitude)
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
var userLat
var userLng
var brewName = ""
var photoID = ""
var i = 0

mainImg = $("#mainImg")
button = $("#btn")

function setImgSrc(photoID) {
  let mainImg = $('#mainImg')
  let address = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=' + photoID + "&key=AIzaSyCARpB8hXKo9eg9ffJNB4CZHM7pM3kTqrg"
  mainImg.attr('src', address)
}

function brewGoog() {
  // testGoogURL0 = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + brewName + '&inputtype=textquery&fields=photo&key=AIzaSyCARpB8hXKo9eg9ffJNB4CZHM7pM3kTqrg'
  googURL0 = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + brewName + '&inputtype=textquery&fields=photo&key=AIzaSyCARpB8hXKo9eg9ffJNB4CZHM7pM3kTqrg'
  // testGoogURL1 = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=CmRaAAAAw1AiqtnSdvjaSrmcwulcoSXtFEr3o5TQZMP2nVJirGyqmh1hHbldHX0LiVotdlymEgyAmPkOtofeNGuKqutn3TBkXkHNHwnoQgjsS7n2OtauzgP5o1CB8I6M2chvORFwEhBSObZmoQa0Nex_oKeW6xsTGhTn9WCDOlF4trANe9yaOwDCCGElWA&key=AIzaSyCARpB8hXKo9eg9ffJNB4CZHM7pM3kTqrg"

  $.ajax({
    url: googURL0,
    method: "GET",
  }).then(function(response) {
    console.log(response)
    photoID = response.candidates[0].photos[0].photo_reference
    console.log(photoID)
    setImgSrc(photoID)
  });

}

function brewCall() {
  brewURL = "https://api.openbrewerydb.org/breweries?by_city=cleveland"

  $.ajax({
    url: brewURL,
    method: "GET",
  }).then(function(response) {
    console.log(response)
    brewName = response[i].name
    console.log(brewName)
    brewGoog()

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

button.on("click", function() {
  i++
  brewCall()
})

//https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Hofbrauhaus%20Cleveland&inputtype=textquery&fields=photo&key=AIzaSyCARpB8hXKo9eg9ffJNB4CZHM7pM3kTqrg
//https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAw1AiqtnSdvjaSrmcwulcoSXtFEr3o5TQZMP2nVJirGyqmh1hHbldHX0LiVotdlymEgyAmPkOtofeNGuKqutn3TBkXkHNHwnoQgjsS7n2OtauzgP5o1CB8I6M2chvORFwEhBSObZmoQa0Nex_oKeW6xsTGhTn9WCDOlF4trANe9yaOwDCCGElWA&key=AIzaSyCARpB8hXKo9eg9ffJNB4CZHM7pM3kTqrg
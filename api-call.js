var userLat
var userLng
var userPost 
var userPostExtra
var userPostExtra0
var brewName = ""
var photoID = ""
var i = 0
var j = 0
var brewArray
var breweryCount = 1
const searchBtn = document.querySelector('#search-btn')
const yesBtn = document.querySelector('#yesBtn')
const cardContainer2 = document.querySelector('#card-container2')
const cardBody = document.querySelector('#card-body')
// const mainImg = document.querySelector('#main-img')
var mainImg = $("#main-img")
const address = document.querySelector('#address')
const yesCity = document.querySelector('#yes-city')
const yesState = document.querySelector('#yes-state')
const cardTitle2 = document.querySelector('#card-title2')
const message = document.querySelector('#message')
const noBtn0 = document.querySelector('#noBtn0')
const noBtn1 = document.querySelector('#noBtn1')
let userCity = document.querySelector('#search-city').value
let userState = document.querySelector('#search-state').value
let results

function setData() {
  var address = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=' + photoID + "&key=AIzaSyCARpB8hXKo9eg9ffJNB4CZHM7pM3kTqrg"
  mainImg.attr('src', address)
  const cardTitle = document.querySelector('#card-title')
  const cardText = document.querySelector('#card-text')
  const cardText2 = document.querySelector('#card-text2')
  const cardText3 = document.querySelector('#card-text3')

  cardTitle.textContent = brewArray[i].name
  cardText.textContent = brewArray[i].street
  cardText2.textContent = brewArray[i].city
  cardText3.textContent = brewArray[i].state
}

function brewGoog() {
    brewName = brewArray[i].name

  // testGoogURL0 = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + brewName + '&inputtype=textquery&fields=photo&key=AIzaSyCARpB8hXKo9eg9ffJNB4CZHM7pM3kTqrg'
  googURL0 = 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' + brewName + '&inputtype=textquery&fields=photo&key=AIzaSyCARpB8hXKo9eg9ffJNB4CZHM7pM3kTqrg'
  // testGoogURL1 = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=CmRaAAAAw1AiqtnSdvjaSrmcwulcoSXtFEr3o5TQZMP2nVJirGyqmh1hHbldHX0LiVotdlymEgyAmPkOtofeNGuKqutn3TBkXkHNHwnoQgjsS7n2OtauzgP5o1CB8I6M2chvORFwEhBSObZmoQa0Nex_oKeW6xsTGhTn9WCDOlF4trANe9yaOwDCCGElWA&key=AIzaSyCARpB8hXKo9eg9ffJNB4CZHM7pM3kTqrg"

  $.ajax({
    url: googURL0,
    method: "GET",
  }).then(function(response) {
    console.log("Photo ID = ", response)
    if (response.status === "ZERO_RESULTS" || response.candidates[0].photos === undefined) {
      console.log("recovered for image error")
      i++
      brewGoog()
    } else {
      photoID = response.candidates[0].photos[0].photo_reference
      // console.log("no error to handle")
      setData()
    }
    // console.log(photoID)
    // setData()
  });

}

function brewCallExtra() {
  j++ 
  userPost = userPostExtra[j].zip_code
  brewCall()
}

function brewCall() {
  brewURL = "https://api.openbrewerydb.org/breweries?by_postal=" + userPost 
  // brewURL = "https://api.openbrewerydb.org/breweries?by_postal=" + "44106" 

  $.ajax({
    url: brewURL,
    method: "GET",
  }).then(function(response) {
    brewArray = response
    console.log("Brewery Search Results by Zip = ", brewArray)
    // console.log(brewName)
    breweryCount = brewArray.length
    if (breweryCount === 0 ) { //----------------------------------------
      brewCallExtra()
      console.log("No breweries in selected postal code.. moving forward")
    } else {
    brewGoog() 
    }
  });
}

function postCallExtra() {

  $.ajax({
    url: 'https://cors-anywhere.herokuapp.com/https://www.zipcodeapi.com/rest/baEsH9hL7FK1SV4U0FxXCKvmi9PGuRAzInS49MIH62kvnRw2XbX2T9dHdgV1aMAX/radius.json/' + userPost + '/50/mile',
    method: "GET",
  }).then(function(response) {
    // console.log(response)
    userPostExtra0 = response
    userPostExtra = kyanite.sort(kyanite.ascendBy(kyanite.prop('distance')), userPostExtra0.zip_codes)
    console.log("Sorted Zip List =", userPostExtra)
  });

}

function postCall() { 
  $.ajax({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + userLat + ',' + userLng + '&key=AIzaSyDIEVzD85LZ_BWwmWAD2qPxTiUNGgA28YI',
    method: "GET",
  }).then(function(response) {
    // console.log(response)
      if          (response.results[0].address_components[5].types[0].indexOf("postal_code") !== -1 ) {
        userPost = response.results[0].address_components[5].short_name
      } else if   (response.results[0].address_components[6].types[0].indexOf("postal_code") !== -1 ) {
        userPost = response.results[0].address_components[6].short_name
      } else if   (response.results[0].address_components[7].types[0].indexOf("postal_code") !== -1 ) {
        userPost = response.results[0].address_components[7].short_name
      } else {
        console.log("Error gps --> postal failure")
      }

    // userPost = response.results[0].address_components[6].short_name
    console.log("User Post = " + userPost)
    brewCall() 
    postCallExtra()
  });
}

function success(pos) {
  var crd = pos.coords
  console.log('User Lat  = ' + crd.latitude)
  console.log('User Long =' + crd.longitude)
  userLat = crd.latitude 
  userLng = crd.longitude
  postCall() 
}

function error(err) {
  console.log('GPS Error(' + err.code + ":" + err.message + ')')
}

window.addEventListener("load", function () {
  navigator.geolocation.getCurrentPosition(success, error)
  noBtn0.style.display="inline-block"
  noBtn1.style.display="none"
})

function searchBrewery () {
  fetch(`https://api.openbrewerydb.org/breweries?by_city=${userCity}&by_state=${userState}`)
  .then(result => {
      return result.json()
  }).then(result => {
    brewArray = result
    console.log("Brewery Search Results by City = ", brewArray)
      brewGoog()
  })
}

searchBtn.addEventListener('click', function () {
  // console.log(userCity)
  userCity = document.querySelector('#search-city').value
  userState = document.querySelector('#search-state').value
  noBtn0.style.display="none"
  noBtn1.style.display="inline-block"

  searchBrewery()

})

yesBtn.addEventListener('click', function() {
  cardBody.classList.add('hide')
  message.textContent = 'Address of selected brewery! : '

  address.textContent = brewArray[i].street
  yesCity.textContent = brewArray[i].city
  yesState.textContent = brewArray[i].state
  cardTitle2.textContent = brewArray[i].name

})

noBtn0.addEventListener('click', function() {
  i++
  if ( i < breweryCount ) {
    brewGoog()
  } else if ( i === breweryCount) {  //|| breweryCount === 0  
    i = 0
    brewCallExtra()
  }
})

noBtn1.addEventListener('click', function() {
  i++
  brewGoog()
})
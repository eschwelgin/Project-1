var userLat
var userLng
var brewName = ""
var photoID = ""
var i = 0
var brewArray
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
const noBtn = document.querySelector('#noBtn')
let userCity = document.querySelector('#search-city').value
let userState = document.querySelector('#search-state').value
let results


mainImg = $("#main-img")
// button = $("#btn")

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
    console.log(response)
    if (response.status === "ZERO_RESULTS" || response.candidates[0].photos === undefined) {
      console.log("recovered for error")
      i++
      brewGoog()
    } else {
      photoID = response.candidates[0].photos[0].photo_reference
      console.log("no error to handle")
      setData()
    }
    // console.log(photoID)
    // setData()
  });

}

function brewCall() {
  brewURL = "https://api.openbrewerydb.org/breweries?by_city=cleveland"

  $.ajax({
    url: brewURL,
    method: "GET",
  }).then(function(response) {
    brewArray = response
    console.log(brewArray)
    // console.log(brewName)
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

function searchBrewery () {
  fetch(`https://api.openbrewerydb.org/breweries?by_city=${userCity}&by_state=${userState}`)
  .then(result => {
      return result.json()
  }).then(result => {
    brewArray = result
      // breweryInit(result)
      brewGoog()
  })
}

searchBtn.addEventListener('click', function () {
  // console.log(userCity)
  userCity = document.querySelector('#search-city').value
  userState = document.querySelector('#search-state').value
  searchBrewery()

})

yesBtn.addEventListener('click', function() {
  cardBody.classList.add('hide')
  message.textContent = 'Address of selected brewery! : '
  address.textContent = results[i].street
  yesCity.textContent = results[i].city
  yesState.textContent = results[i].state
  cardTitle2.textContent = results[i].name
})

noBtn.addEventListener('click', function() {
  i++
  brewGoog()
  })


// button.on("click", function() {
//   i++
//   brewGoog()
// })

//https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Hofbrauhaus%20Cleveland&inputtype=textquery&fields=photo&key=AIzaSyCARpB8hXKo9eg9ffJNB4CZHM7pM3kTqrg
//https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAw1AiqtnSdvjaSrmcwulcoSXtFEr3o5TQZMP2nVJirGyqmh1hHbldHX0LiVotdlymEgyAmPkOtofeNGuKqutn3TBkXkHNHwnoQgjsS7n2OtauzgP5o1CB8I6M2chvORFwEhBSObZmoQa0Nex_oKeW6xsTGhTn9WCDOlF4trANe9yaOwDCCGElWA&key=AIzaSyCARpB8hXKo9eg9ffJNB4CZHM7pM3kTqrg
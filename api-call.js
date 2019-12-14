// sandbox url https://sandbox-api.brewerydb.com/v2/
// Key:b04f7e596969ab2a01ec840dc8a0d9c0

var styleId = 93 //range with current URL is 93-164
  // have to use a cors proxy to prevent cross-origin resource sharing errors 
  // https://cors-anywhere.herokuapp.com/
var beerURL = 'https://cors-anywhere.herokuapp.com/sandbox-api.brewerydb.com/v2/beers?styleId=' + styleId + '&key=b04f7e596969ab2a01ec840dc8a0d9c0&withBreweries=Y'

$.ajax({
    url: beerURL,
    method: "GET",
  }).then(function(response) {
    console.log(response)
});


let userCity = document.querySelector('#search-city').value
let userState = document.querySelector('#search-state').value
let results

function searchBrewery () {

    
    fetch(`https://api.openbrewerydb.org/breweries?by_city=${userCity}&by_state=${userState}`)
    .then(result => {
        return result.json()
    }).then(result => {
    	results = result
        breweryInit(result)
    })
}
function breweryInit (brewFromServer) {
    // results = brewFromServer
    // let i = 0 
    
    const cardTitle = document.querySelector('#card-title')
    const cardText = document.querySelector('#card-text')
    const cardText2 = document.querySelector('#card-text2')
    const cardText3 = document.querySelector('#card-text3')

    cardTitle.textContent = results[i].name
    cardText.textContent = results[i].street
    cardText2.textContent = results[i].city
    cardText3.textContent = results[i].state
    console.log(results)
  
}

const noBtn = document.querySelector('#noBtn')
let i=0
noBtn.addEventListener('click', function() {
i++
breweryInit()
console.log("click")
})


const searchBtn = document.querySelector('#search-btn')


// if (userCity && userState) {

    
// }
searchBtn.addEventListener('click', function () {
    // console.log(userCity)
    userCity = document.querySelector('#search-city').value
    userState = document.querySelector('#search-state').value
    searchBrewery()

    
})



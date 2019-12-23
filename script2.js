const userCity = document.querySelector('#search-city').value
const userState = document.querySelector('#search-state').value

function searchBrewery () {

    
    fetch(`https://api.openbrewerydb.org/breweries?by_city=${userCity}&by_state=${userState}`).then(result => {
        return result.json()
    }).then(result => {
        breweryInit(result)
    })
}

function breweryInit (brewFromServer) {
    const results = brewFromServer

    
    const cardTitle = document.querySelector('#card-title')
    const cardText = document.querySelector('#card-text')
    const cardText2 = document.querySelector('#card-text2')
    const cardText3 = document.querySelector('#card-text3')

    cardTitle.textContent = results[0].name
    // cardText.textContent = results[0].street
    // cardText2.textContent = results[0].city
    // cardText3.textContent = results[0].state
    console.log(results)

    const noBtn = document.querySelector('#noBtn')

    noBtn.addEventListener('click', function() {
    
       
    
})

const searchBtn = document.querySelector('#search-btn')


// if (userCity && userState) {

    
// }
searchBtn.addEventListener('click', function () {
    // console.log(userCity)
    // userCity = document.querySelector('#search-city').value
    // userState = document.querySelector('#search-state').value
    searchBrewery()

    
})



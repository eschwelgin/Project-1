function searchBrewery () {


    fetch(`https://api.openbrewerydb.org/breweries?by_city=${userCity}`).then(result => {
        return result.json()
    }).then(result => {
        breweryInit(result)
    })
}

function breweryInit (brewFromServer) {
    const results = brewFromServer

    console.log(brewFromServer)
}

const searchBtn = document.querySelector('#search-btn')

searchBtn.addEventListener('click', function () {
    // console.log(userCity)
    userCity = document.querySelector('#search-input').value
    searchBrewery()
})
//-----------------------------------------------------------------------------------------------------------------------------//
// Global Variables
//-----------------------------------------------------------------------------------------------------------------------------//
var APIKey = '187b46953877ee25caa3c164a82a38f2';
var cityFormEl = document.getElementById('city-form');
var cityNameEl = document.getElementById('city-name');
var clearButtonEl = document.getElementById('clear-button');
var historyContainerEl = document.getElementById('history-container');
var weatherContainerEl = document.getElementById('weather-container');
var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];  
//-----------------------------------------------------------------------------------------------------------------------------//
// Render History: call the create button function to create the buttons that are stored in the local storage
//-----------------------------------------------------------------------------------------------------------------------------//
function renderHistory() {
    createHistoryButtons();
}
renderHistory();
//-----------------------------------------------------------------------------------------------------------------------------//
// Form Handler: take in the city name from the input value
//-----------------------------------------------------------------------------------------------------------------------------//
function formHandler(event) {
    event.preventDefault();
    var cityName = cityNameEl.value.trim();
    runData(cityName);
    cityNameEl.value = '';
}
//-----------------------------------------------------------------------------------------------------------------------------//
// Run Data: run fetch data for live weather and forecast 
//-----------------------------------------------------------------------------------------------------------------------------//
function runData(city) {
    weatherFetch(city);
    forcastFetch(city);
}
//-----------------------------------------------------------------------------------------------------------------------------//
// History Click: fetch data for the city in the search history on click
//-----------------------------------------------------------------------------------------------------------------------------//
function historyClick() {
    runData(this.value);
}
//-----------------------------------------------------------------------------------------------------------------------------//
// Create Search History: add cities that exist into the search history array, then save it into local storage
//-----------------------------------------------------------------------------------------------------------------------------//
function createSearchHistory(data) {
    if (searchHistory.indexOf(data) !== -1) {
        return;
    }
    searchHistory.push(data);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
    renderHistory();
}
//-----------------------------------------------------------------------------------------------------------------------------//
// Create History Buttons: empty the history container, then create history buttons using the search history array
//-----------------------------------------------------------------------------------------------------------------------------//
function createHistoryButtons() {
    historyContainerEl.innerHTML = ''
    for (var x = 0; x < searchHistory.length; x++) {
        var historyButton = document.createElement('button');
        historyButton.setAttribute('class', 'btn btn-secondary mb-3');
        historyButton.setAttribute('type', 'button')
        historyButton.setAttribute('value', searchHistory[x])
        historyButton.textContent = searchHistory[x];
        historyButton.addEventListener('click', historyClick);
        historyContainerEl.appendChild(historyButton);
    }
}
//-----------------------------------------------------------------------------------------------------------------------------//
// Clear Button: delete search history in the local storage
//-----------------------------------------------------------------------------------------------------------------------------//
clearButtonEl.addEventListener("click", function () {
    localStorage.removeItem('searchHistory');
    location.reload();
});
//-----------------------------------------------------------------------------------------------------------------------------//
// Weather Fetch: fetch data with API and create elements with the required data
//-----------------------------------------------------------------------------------------------------------------------------//
function weatherFetch(cityName) {
    var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + "&appid=" + APIKey + '&units=metric';
    fetch(queryURL)
    .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data.message === 'city not found') {
                console.log('not found');
            } else {
                console.log(data);
                createSearchHistory(data.name)
                var cardContainer = document.createElement('div')
                var card = document.createElement('div')
                var cityTitle = document.createElement('h3')

                cardContainer.setAttribute('class', "card text-white bg-dark")
                card.setAttribute("class", "card-body")
                
                cityTitle.textContent = data.name
                

                card.append(cityTitle)
                cardContainer.append(card)
                
                weatherContainerEl.append(cardContainer)
                

            }
        })
    }

    function forcastFetch(cityName){
        var queryURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + "&appid=" + APIKey + '&units=metric';
        fetch(queryURL)
        .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if (data.message === 'city not found') {
                    console.log('not found');
                } else {
                    console.log(data);
                    //    document.getElementById('current-city').textContent =data.name
                  
                    
    
                }
            })
    }

//-----------------------------------------------------------------------------------------------------------------------------//
// Event Listeners
//-----------------------------------------------------------------------------------------------------------------------------//
cityFormEl.addEventListener('submit', formHandler);
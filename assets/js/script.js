//-----------------------------------------------------------------------------------------------------------------------------//
// Global Variables
//-----------------------------------------------------------------------------------------------------------------------------//
var APIKey = '187b46953877ee25caa3c164a82a38f2';
var cityFormEl = document.querySelector('#city-form');
var cityNameEl = document.querySelector('#city-name');
var historyContainerEl = document.querySelector('#history-container');
//-----------------------------------------------------------------------------------------------------------------------------//
// Render History: read search history from the local storage or return an empty array ([]) if there aren't any searches
//-----------------------------------------------------------------------------------------------------------------------------//
function renderHistory() {
    searchHistory = localStorage.getItem('searchHistory');
    if (searchHistory) {
        searchHistory = JSON.parse(searchHistory);
    } else {
        searchHistory = [];
    }
    for (var x = 0; x < searchHistory.length; x++) {
        createHistoryButtons(searchHistory[x]);
    }
}
renderHistory();
//-----------------------------------------------------------------------------------------------------------------------------//
// Form Handler: submit search form when users enter a valid city name and save it to local storage
//-----------------------------------------------------------------------------------------------------------------------------//
function formSubmitHandler(event) {
    event.preventDefault();

    var cityName = cityNameEl.value.trim();
    searchHistory.push(cityName);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    getCityWeather(cityName);
    createHistoryButtons(cityName);
    cityNameEl.value = '';
}
cityFormEl.addEventListener('submit', formSubmitHandler);
//-----------------------------------------------------------------------------------------------------------------------------//
// Create Buttons: create history buttons after form submission or from reading local storage
//-----------------------------------------------------------------------------------------------------------------------------//
function createHistoryButtons(cityName) {
    var historyButton = document.createElement('button');
    historyButton.classList.add('btn', 'btn-secondary', 'mb-3');
    historyButton.setAttribute('type', 'button')
    historyButton.innerHTML = cityName;
    historyButton.addEventListener('click', getCityWeather(cityName));
    historyContainerEl.appendChild(historyButton);
}
//-----------------------------------------------------------------------------------------------------------------------------//
// Create Buttons: create history buttons after form submission or from reading local storage
//-----------------------------------------------------------------------------------------------------------------------------//
var clearButton = document.querySelector('#clear-button');
clearButton.addEventListener("click", function () {
    localStorage.removeItem('searchHistory');
    location.reload();
  });
//-----------------------------------------------------------------------------------------------------------------------------//
// Retrieve Weather Data:
//-----------------------------------------------------------------------------------------------------------------------------//
function getCityWeather(cityName) {
    var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + "&appid=" + APIKey + '&units=metric';
    fetch(queryURL)
        .then(function (response) {
            response.json();
        })
}

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

// list.main.temp
// list.main.humidity
// list.wind.speed
// list.weather.icon


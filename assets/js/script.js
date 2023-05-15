//-----------------------------------------------------------------------------------------------------------------------------//
// Global Variables
//-----------------------------------------------------------------------------------------------------------------------------//
var APIKey = '187b46953877ee25caa3c164a82a38f2';
var iconURL = 'https://openweathermap.org/img/wn/';
var cityFormEl = document.getElementById('city-form');
var cityNameEl = document.getElementById('city-name');
var clearButtonEl = document.getElementById('clear-button');
var historyContainerEl = document.getElementById('history-container');
var weatherContainerEl = document.getElementById('weather-container');
var searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
//-----------------------------------------------------------------------------------------------------------------------------//
// Geo-Location: allow users to see weather and forecast of their city (This is just for fun, not a part of the challenge)
//-----------------------------------------------------------------------------------------------------------------------------//
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + "&lon=" + longitude + '&appid=' + APIKey;
        fetch(queryURL)
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data);
                        var city = data.city.name;
                        runData(city);
                    })
                }
            })
    });
} else {
    console.log("Geolocation is not supported by this browser.");
}
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
    weatherContainerEl.innerHTML = '';
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
// Weather Fetch: fetch data with API and create elements for the current weather condition
//-----------------------------------------------------------------------------------------------------------------------------//
function weatherFetch(cityName) {
    var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + "&appid=" + APIKey + '&units=metric';
    fetch(queryURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    var unix = data.dt_txt
                    var date = dayjs(unix).format('MMMM D, YYYY');
                    createSearchHistory(data.name);
                    // Create elements for the current weather container
                    var cardContainer = document.createElement('div');
                    var card = document.createElement('div');
                    var cityTitle = document.createElement('h3');
                    var icon = document.createElement('img');
                    var temp = document.createElement('li');
                    var wind = document.createElement('li');
                    var hum = document.createElement('li');

                    // Set classess and retrieve icon
                    cardContainer.setAttribute('class', 'card text-white bg-dark');
                    card.setAttribute('class', 'card-body');
                    icon.setAttribute('src', iconURL + data.weather[0].icon + '.png');

                    // Create element text content 
                    cityTitle.textContent = data.name + ' (' + date + ')';
                    temp.textContent = 'Temperature: ' + data.main.temp + '°C';
                    wind.textContent = 'Wind: ' + data.wind.speed + ' m/s';
                    hum.textContent = 'Humidity: ' + data.main.humidity + '%';

                    // Append the elements
                    card.append(cityTitle, icon, temp, wind, hum);
                    cardContainer.append(card);
                    weatherContainerEl.append(cardContainer);
                });
            } else {
                alert('Error! Please Try Again!');
            }
        })
}
//-----------------------------------------------------------------------------------------------------------------------------//
// Forecast Fetch: fetch forecast data with API for the next five days
//-----------------------------------------------------------------------------------------------------------------------------//
function forcastFetch(cityName) {
    var queryURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + "&appid=" + APIKey + '&units=metric';
    fetch(queryURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    // Create elements for the forecast container
                    var forecastCardContainer = document.createElement('div');
                    var forecastCard = document.createElement('div');
                    var forecastTitle = document.createElement('h3');
                    var fiveDaysContainer = document.createElement('div');

                    // Add class
                    forecastCardContainer.setAttribute('class', 'card border-dark');
                    forecastCard.setAttribute('class', 'card-body');
                    fiveDaysContainer.setAttribute('class', 'd-flex justify-content-evenly grid row');

                    // Add text content for h3
                    forecastTitle.textContent = 'Five Day Forecast';

                    // Append on the webpage
                    forecastCard.append(forecastTitle, fiveDaysContainer);
                    forecastCardContainer.append(forecastCard);
                    weatherContainerEl.append(forecastCardContainer);

                    // For loop for creating the elements and data for the 5 day forecast 
                    for (var x = 0; x < data.list.length; x += 8) {
                        var unix = data.list[x].dt_txt
                        var date = dayjs(unix).format('MMMM D');
                        var dayContainer = document.createElement('div');
                        var dayBody = document.createElement('div');
                        var dayTitle = document.createElement('h4');
                        var dayIcon = document.createElement('img');
                        var dayTemp = document.createElement('li');
                        var dayWind = document.createElement('li');
                        var dayHum = document.createElement('li');

                        // Add class and icon for each day container
                        dayContainer.setAttribute('class', 'col-2 card');
                        dayBody.setAttribute('class', 'card-body');
                        dayIcon.setAttribute('src', iconURL + data.list[x].weather[0].icon + '.png');

                        // Modify text content with data
                        dayTitle.textContent = date;
                        dayTemp.textContent = 'Temp: ' + data.list[x].main.temp + '°C';
                        dayWind.textContent = 'Wind: ' + data.list[x].wind.speed + ' m/s';
                        dayHum.textContent = 'Humidity: ' + data.list[x].main.humidity + '%';

                        // Append the elements
                        dayBody.append(dayTitle, dayIcon, dayTemp, dayWind, dayHum);
                        dayContainer.append(dayBody);
                        fiveDaysContainer.append(dayContainer);
                    }
                });
            } else {
                console.log('blank input or non-existent city');
            }
        })
}
//-----------------------------------------------------------------------------------------------------------------------------//
// Event Listener
//-----------------------------------------------------------------------------------------------------------------------------//
cityFormEl.addEventListener('submit', formHandler);
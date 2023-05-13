//----------------------------------------------------------------------------------------//
var cityFormEl = document.querySelector('#city-form');
var cityNameEl = document.querySelector('#city-name');
var currentWeatherContainerEl = document.querySelector('#current-weather-container');
var forecastContainerEl = document.querySelector('#forecast-container');

// Submit search form when users enter a valid city name
function formSubmitHandler(event) {
 event.preventDefault();

 var cityName = cityNameEl.value.trim();

 if (cityName) {
    getCityWeather(cityName);

    currentWeatherContainerEl = '';
    forecastContainerEl = '';
    cityNameEl.value = '';
 } else {
    alert('Please enter a valid city!');
 }
}

cityFormEl.addEventListener('submit', formSubmitHandler);

//----------------------------------------------------------------------------------------//
var APIKey = '187b46953877ee25caa3c164a82a38f2';

function getCityWeather (cityName) {
    var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + "&appid=" + APIKey + '&units=metric';
    fetch (queryURL)
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
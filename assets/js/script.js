var cityFormEl = document.querySelector('#city-form');
var cityNameEl = document.querySelector('#city-name');
var currentWeatherContainerEl = document.querySelector('#current-weather-container');
var forecastContainerEl = document.querySelector('#forecast-container');


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


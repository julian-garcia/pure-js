// Initialise weather and UI objects to fetch current weather
const storage = new Storage();
const weather = new Weather(storage.getLocationData().city);
const ui = new UI();

// details and render it to the page
const change_weather_button = document.getElementById('w-change-btn');

// Retrieve weather details on page load and when the user enters another location
document.addEventListener('DOMContentLoaded', getWeather());
change_weather_button.addEventListener('click', function(e) {
  const city_entered = document.getElementById('city');
  storage.setLocationData(city_entered.value);
  weather.changeLocation(storage.getLocationData().city);
  getWeather();
});

function getWeather() {
  weather.getWeather()
    .then(results => {
      ui.paint(results.current, results.location);
    })
    .catch(err => console.log(err))
}

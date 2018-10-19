class UI {
  constructor() {
    this.location = document.getElementById('w-location');
    this.icon = document.getElementById('w-icon');
    this.humidity = document.getElementById('w-humidity');
    this.feels_like = document.getElementById('w-feels-like');
    this.temperature = document.getElementById('w-temperature');
    this.wind = document.getElementById('w-wind');
    this.time = document.getElementById('w-time');
  }

  paint(results, loc) {
    this.location.textContent = `${loc.name}, ${loc.country}`;
    this.icon.setAttribute('src', `http://${results.condition.icon}`);

    this.humidity.textContent = `Humidity: ${results.humidity}%`;
    this.feels_like.textContent = `Feels like: ${results.feelslike_c} C`;
    this.temperature.textContent = `${results.temp_c} C`;
    this.wind.textContent = `Wind: ${results.wind_mph} mph`;
    this.time.textContent = loc.localtime;
  }
}

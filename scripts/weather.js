class Weather {
  constructor(city) {
    this.apiKey = '70bd2d5796fe46e28cb180331181810';
    this.city = city;
  }

  // Fetch weather from API
  async getWeather() {
    const response = await fetch(`https://api.apixu.com/v1/current.json?key=${this.apiKey}&q=${this.city}`);

    const responseData = await response.json();
    return responseData;
  }

  // Change location
  changeLocation(city) {
    this.city = city;
  }
}

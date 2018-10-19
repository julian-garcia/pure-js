class Storage {
  constructor() {
    this.city;
    this.default_city = 'london';
  }

  getLocationData() {
    if (localStorage.getItem('city') === null){
      this.city = this.default_city;
    } else {
      this.city = localStorage.getItem('city');
    }
    return {
      city: this.city
    }
  }

  setLocationData(city) {
    localStorage.setItem('city', city);
  }
}

class Forecast {
    constructor() {
        this.apikey = 'NMXUgDHEXeP32E3C93oQSdSkGW3QDaaE';
        this.cityURI = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        this.weatherURI = `http://dataservice.accuweather.com/currentconditions/v1/`;
    }

    async updateCity(city) {
        const cityDets = await this.getCity(city);
        const weather = await this.getWeather(cityDets.Key);

        return {
            cityDets, weather
        };
    }
// ~/Library/Application Support/discord/settings.json
    async getCity(city) {
        const base = this.cityURI;
        const query = `?apikey=${this.apikey}&q=${city}`;

        const response = await fetch(base + query);
        const data = await response.json();

        return data[0];
    }

    async getWeather(cityDetsKey) {
        const base = this.weatherURI;
        const query = `${cityDetsKey}?apikey=${this.apikey}`;

        const response = await fetch(base + query);
        const data = await response.json();

        return data[0];
    }

}




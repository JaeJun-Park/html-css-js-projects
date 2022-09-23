const key = 'NMXUgDHEXeP32E3C93oQSdSkGW3QDaaE';

const getCity = async (city) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    console.log(data[0]);
    return data[0];
}

const getWeather = async (locationKey) => {
    const base = `http://dataservice.accuweather.com/currentconditions/v1/`;
    const query = `${locationKey}?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    console.log(data[0]);
    return data[0];
}


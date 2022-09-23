
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUI = ({ cityDets, weather }) => {
    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">
            ${weather.WeatherText}
            <div class="display-4 my-4"><span>${weather.Temperature.Metric.Value}</span><span>&deg;C</span></div>
        </div>
    `;
    // update the night/day & icon images
    time.src = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    icon.src = `img/icons/${weather.WeatherIcon}.svg`;

    
}

const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    return {
        cityDets, weather
    };
}

cityForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    card.classList.add('show');
    //update the ul with the new city info

    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}) 
const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = ({ cityDets, weather }) => {
    card.classList.add('show');
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



cityForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const city = cityForm.city.value.trim();
    // set local storage
    localStorage.setItem('city', city);
    cityForm.reset();

    //update the ul with the new city info
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
})

let init = localStorage.getItem('city');
if (init) {
    forecast.updateCity(init)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}
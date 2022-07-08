// File for DOM Manipulation

const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateCity = async (city) => {

    const cityDets = await getCity(city);                       // gives the city details
    const weather = await getWeather(cityDets.Key);             // gives the weather details of the given city

    return { cityDets : cityDets, weather: weather };
};

const updateUI = (data) => {

    const cityDets = data.cityDets;
    const weather = data.weather;

    // update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    // update the night/day and icon image
    let timeSrc = null;
    if(weather.IsDayTime == true)
    {
        timeSrc = 'img/day.svg';
    }
    else
    {
        timeSrc = 'img/night.svg';
    }
    time.setAttribute('src', timeSrc);

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    // removing d-none class if present
    if(card.classList.contains('d-none'))
        card.classList.remove('d-none');
}



cityForm.addEventListener('submit', (event) => {
    // Prevent Default Action
    event.preventDefault();                         // So that the page does not refresh after each submit.

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();                               // clear out the form feilds

    // update the ui with new city
    updateCity(city)
        .then((data) => {updateUI(data)})
        .catch((err) => {console.log(err)});

});







// NOTE: Since the forecast.js is linked above than the app.js file in index.html file, hence we can
// use the functions made in the forecast.js in app.js
const cityForm = document.querySelector('.change-location');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();


const updateUI = (data) => {
    const cityDetails = data.cityDetails;
    const weather = data.weather;

    // update template
    details.innerHTML =
    `<h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
    `;

    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconSrc);

    // update time
    let timeSrc = null;
    if(weather.IsDayTime){
        timeSrc = './img/day.svg';
    }else {
        timeSrc = './img/night.svg';
    }

    time.setAttribute('src', timeSrc);

    // show image class:
    if (card.style.display = 'none') {
        card.style.display ='block'
    };  
};


cityForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();


forecast.updateCity(city)
    .then((data)=>{ updateUI(data)})
    .catch((err)=>{console.log(err)});

    // set local storage
    localStorage.setItem('city', city);
});

if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city'))
    .then((data) => {updateUI(data)})
    .catch((err) => {console.log(err)});
}
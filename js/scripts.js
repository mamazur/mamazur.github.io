import "regenerator-runtime/runtime";
import '../scss/styles.scss'
 

(function (window, document, undefined) {

  //window.onload = init;

  function init() {
    let city = document.getElementById('autoComplete').textContent || 'Mainz';
    fetchWeatherFromApi(city);
    setInterval(setCity, 2000);
  }
})(window, document, undefined);

async function fetchWeatherFromApi(city) {
  const WEATHER_API = 'api.openweathermap.org';
  const API_KEY = '18ceef033fcda8f9e022df00c39956c9';
  let url = `https://${WEATHER_API}/data/2.5/weather?q=${city}&APPID=${API_KEY}&lang=de&units=metric`;

  fetch(url)
  .then(response => response.json())
  .then(data => {
      setCountry(data.sys.country)
      setTemprature(data.main.temp)
      addWeatherImage(data.weather[0]);
  })
  .catch(error => console.error(error));
}


function setCountry(country){
  document.getElementById('city-country').textContent = country;
}

function setTemprature(temp){
    document.getElementById('city-temperature').textContent = `${temp} °C`;
  
  }

function addWeatherImage(weather) {
  let img = document.createElement('img');
  img.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  let container = document.getElementById('weather-img');
  clearWeatherImage();
  container.appendChild(img);
  document.getElementById('city-weather').textContent = weather.main;
}
function clearWeatherImage() {
    let container = document.getElementById('weather-img');
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

//https://tarekraafat.github.io/autoComplete.js/#/
function setCity() {
  let typingTimer;
  let doneTypingInterval = 2000;
  let cityInput = document.getElementById('autoComplete');

  cityInput.addEventListener('keyup', function() {
      clearTimeout(typingTimer);
      if (cityInput.value) {
          typingTimer = setTimeout(doneTyping, doneTypingInterval);
      }
  });

  function doneTyping () {
    let city = cityInput.value || 'Mainz';
    document.getElementById('city-name').textContent = city;
    fetchWeatherFromApi(city);
  }
}

(function (window, document, undefined) {

  window.onload = init;

  function init() {
    var city = document.getElementById('autoComplete').textContent || 'Mainz';
    fetchWeatherFromApi(city);
    setInterval(setCity, 2000);
  }
})(window, document, undefined);

async function fetchWeatherFromApi(city) {
  WEATHER_API = 'api.openweathermap.org';
  API_KEY = '18ceef033fcda8f9e022df00c39956c9';
  let url = `https://${WEATHER_API}/data/2.5/weather?q=${city}&APPID=${API_KEY}`;
  
  fetch(url)
  .then(response => response.json())
  .then(data => {
      setCountry(data.sys.country)
      setTemprature(data.main.temp)
      setDate(data.timezone);
      addWeatherImage(data.weather[0]);
  })
  .catch(error => console.error(error));
}


// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=18ceef033fcda8f9e022df00c39956c9
// function getWeatherFromApi(city) {
//   WEATHER_API = 'api.openweathermap.org';
//   API_KEY = '18ceef033fcda8f9e022df00c39956c9';
//   var request = new XMLHttpRequest()
//   var apiCall = `https://${WEATHER_API}/data/2.5/weather?q=${city}&APPID=${API_KEY}`;

//   request.open('GET', apiCall, true);

//   request.onload = function () {
//     var data = JSON.parse(this.response)
//     if (request.status >= 200 && request.status < 400) {
//       document.getElementById('city-weather').textContent = data.weather[0].main;
//       document.getElementById('city-country').textContent = data.sys.country;
//       setTemprature(data.main.temp)
//       setDate(data.dt);
//     } else {
//       console.log('Opps, something went wrong!')
//     }
//   }
//   request.send(); 
// };

function convertKelvinToCelsius(kelvin) {
  ZERO = 273.15;
  return kelvin < (0) ?  `${kelvin} is < 0 K` : (kelvin - ZERO).toFixed(1);
}

function convertDate(timezone){
  return new Date()
    .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}

function setDate(){
  document.getElementById('city-time').textContent = convertDate();
}

function setCountry(country){
  document.getElementById('city-country').textContent = country;
}

function setTemprature(temp){
  document.getElementById('city-temperature').textContent 
    = `${convertKelvinToCelsius(temp)} °C`;

}

function addWeatherImage(weather) {
  let img = document.createElement('img');
  img.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
  container = document.getElementById('weather-img');
  clearWeatherImage();
  container.appendChild(img);
  document.getElementById('city-weather').textContent = weather.main;
}
function clearWeatherImage() {
  container = document.getElementById('weather-img');
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

// https://tarekraafat.github.io/autoComplete.js/#/
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


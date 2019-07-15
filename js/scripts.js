(function (window, document, undefined) {

  window.onload = init;

  function init() {
    var city = document.getElementById('autoComplete').textContent || 'Mainz';
    fetchWeatherFromApi(city);
    setInterval(setCity, 1000);
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
      setDate(data.dt - data.timezone);
      addWeatherImage(data.weather[0].icon);
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

function convertDate(date){
  return new Date(date * 1000)
    .toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}

function setDate(date){
  document.getElementById('city-time').textContent = convertDate(date);
}

function setCountry(country){
  document.getElementById('city-country').textContent = country;
}

function setTemprature(temp){
  document.getElementById('city-temperature').textContent 
    = `${convertKelvinToCelsius(temp)} °C`;

}

function addWeatherImage(icon) {
  let img = document.createElement('img');
  let i = 0;
  img.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  container = document.getElementById('weather-img');
  if (container.childElementCount > i) clearWeatherImage();
  while ( i < 10) {
    container.appendChild(img);
    i += 1;
  }
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


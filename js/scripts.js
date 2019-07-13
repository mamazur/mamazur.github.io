(function (window, document, undefined) {

  // code that should be taken care of right away

  window.onload = init;

  function init() {
    // the code to be called when the DOM has loaded #document has its nodes
    var city = document.getElementById('city-name').textContent;
    getWeatherFromApi(city);
    setInterval(setCurrentTime, 1000);
  }

})(window, document, undefined);

// api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=18ceef033fcda8f9e022df00c39956c9
function getWeatherFromApi(city) {
  WEATHER_API = 'api.openweathermap.org';
  API_KEY = '18ceef033fcda8f9e022df00c39956c9';
  var request = new XMLHttpRequest()
  var apiCall = `https://${WEATHER_API}/data/2.5/weather?q=${city}&APPID=${API_KEY}`;

  // Open a new connection, using the GET request on the URL endpoint
  request.open('GET', apiCall, true);

  request.onload = function () {
    var data = JSON.parse(this.response)
    if (request.status >= 200 && request.status < 400) {
      document.getElementById('city-weather').textContent = data.weather[0].main;
      document.getElementById('city-temperature').textContent = `${convertKelvinToCelsius(data.main.temp)} °C`;
    } else {
      console.log('Opps, something went wrong!')
    }
  }
  request.send(); // Send request
};

function convertKelvinToCelsius(kelvin) {
  ZERO = 273.15;
  if (kelvin < (0)) {
    return 'below absolute zero (0 K)';
  } else {
    return (kelvin - ZERO).toFixed(1);
  }
}

function setCurrentTime() {
  document.getElementById('city-time').textContent 
    = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
}

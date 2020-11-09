function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function search(city) {
  let apiKey = "59a15f9eb2d8a3d337f3a6cafe49e480";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
  console.log(apiUrl);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#cityTyped");
  search(cityInputElement.value);
}

function chooseIcon(response) {
  let icon;
  let weatherCondition = response.data.weather[0].main;

  if (weatherCondition === "Clear") {
    icon = "004-sun";
  }

  if (weatherCondition === "Rain" || weatherCondition === "Squall") {
    icon = "008-heavy rain";
  }

  if (weatherCondition === "Snow") {
    icon = "011-snow";
  }

  if (weatherCondition === "Thunderstorm") {
    icon = "006-thunderstorm";
  }

  if (weatherCondition === "Clouds") {
    icon = "001-cloudy";
  }

  if (
    weatherCondition === "Fog" ||
    weatherCondition === "Mist" ||
    weatherCondition === "Smoke" ||
    weatherCondition === "Haze" ||
    weatherCondition === "Dust" ||
    weatherCondition === "Ash" ||
    weatherCondition === "Sand"
  ) {
    icon = "022-fog";
  }

  if (weatherCondition === "Tornado") {
    icon = "028-tornado";
  }

  if (weatherCondition === "Drizzle") {
    icon = "007-rain";
  }

  return icon;
}

function displayWeather(response) {
  let cityElement = document.querySelector("#city");
  let temp = document.querySelector("#temp");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  let image = document.querySelector("#pic");

  image.innerHTML = ` <img src="imgs2/${chooseIcon(
    response
  )}.svg" id="bigWeatherImage">`;

  cityElement.innerHTML = response.data.name;

  celsiusTemperature = response.data.main.temp;

  let dateElement = document.querySelector("#time");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  let temperature = Math.round(celsiusTemperature);
  temp.innerHTML = `${temperature}`;

  let windDisp = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind: ${windDisp}m/s`;

  let humidityDisp = Math.round(response.data.main.humidity);
  humidity.innerHTML = `Humidity: ${humidityDisp}%`;
}

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  console.log(url);
  axios.get(url).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  let FahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(FahrenheitTemp);
}

function displayCelcius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let celciusLink = document.querySelector("#celsius-link");
celciusLink.addEventListener("click", displayCelcius);

let FahrenheitLink = document.querySelector("#farenheit-link");
FahrenheitLink.addEventListener("click", displayFahrenheit);

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", getCurrentLocation);

search("Seoul");

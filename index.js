let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hour = now.getHours();
let minutes = now.getMinutes();

let times = document.querySelector(".time");
times.innerHTML = `${day}, ${hour}:${minutes}`;

function typeCity(event) {
  event.preventDefault();
  let input = document.querySelector("#cityTyped");
  let city = document.querySelector("#city");
  input = input.value;
  city.innerHTML = input;
  let apiKey = "59a15f9eb2d8a3d337f3a6cafe49e480";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=${apiKey}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeather);
}

let form = document.querySelector("form");
form.addEventListener("submit", typeCity);

function showWeather(response) {
  let temp = document.querySelector("#temp");
  let precipitations = document.querySelector("#precipitation");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");

  let temperature = Math.round(response.data.main.temp);
  temp.innerHTML = `${temperature}°C`;

  let windDisp = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind: ${windDisp}m/s`;

  let humidityDisp = Math.round(response.data.main.humidity);
  humidity.innerHTML = `Humidity: ${humidityDisp}%`;

  let precipDisp = Math.round(response.data.clouds.all);
  precipitations.innerHTML = `Precipitation: ${precipDisp}%`;
}

function currentButtonClicked(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  console.log(url);
  axios.get(url).then(currentWeather);
}
function currentWeather(response) {
  let temp = document.querySelector("#temp");
  let precipitations = document.querySelector("#precipitation");
  let wind = document.querySelector("#wind");
  let humidity = document.querySelector("#humidity");
  let temperature = Math.round(response.data.main.temp);
  temp.innerHTML = `${temperature}°C`;

  let windDisp = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind: ${windDisp}m/s`;

  let humidityDisp = Math.round(response.data.main.humidity);
  humidity.innerHTML = `Humidity: ${humidityDisp}%`;

  let precipDisp = Math.round(response.data.clouds.all);
  precipitations.innerHTML = `Precipitation: ${precipDisp}%`;

  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
}

let currentButton = document.querySelector("#current");
currentButton.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(currentButtonClicked)
);

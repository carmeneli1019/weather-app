function formatString(string) {
  string = string[0].toUpperCase() + string.slice(1).toLowerCase(); //making the first letter upper case and the rest lowercase
  return string;
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let weekDay = weekDays[date.getDay()];

  return `Last updated: ${weekDay}, ${hours}:${minutes}`;
}

function displayWeather(response) {
  let timestamp = response.data.dt * 1000;
  document.querySelector("#date").innerHTML = formatDate(timestamp);

  let city = response.data.name;
  document.querySelector("#city").innerHTML = city;

  let weather = response.data.weather[0].main;
  document.querySelector("#weather-icon").innerHTML =
    weatherIcons[weather].iconHTML;

  let description = formatString(response.data.weather[0].description);
  document.querySelector("#description").innerHTML = description;

  let temperature = Math.round(response.data.main.temp);
  document.querySelector("#temperature").innerHTML = temperature;

  let wind = Math.round(response.data.wind.speed * 3.6); //wind is originally in m/s, this is the conversion to km/h
  document.querySelector("#wind").innerHTML = `${wind} km/h`;

  let humidity = response.data.main.humidity;
  document.querySelector("#humidity").innerHTML = `${humidity}%`;

  let feelsLike = Math.round(response.data.main.feels_like);
  document.querySelector("#feels-like").innerHTML = `${feelsLike} ºC`;
}

function searchCity(city) {
  if (city) {
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeather);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
  document.querySelector("#city-input").value = "";
}

function handlePosition(position) {
  let units = "metric";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function searchCurrentLocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

const apiKey = "09136c24d8444755f87419ea9e97055a";

let searchButton = document.querySelector("#search-city-form");
searchButton.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", searchCurrentLocation);

//initial city search
searchCity("washington dc");
//

let weatherIcons = {
  Thunderstorm: {
    iconHTML: `<i class="fas fa-bolt"></i>`,
  },
  Drizzle: {
    iconHTML: `<i class="fas fa-cloud-rain"></i>`,
  },
  Rain: {
    iconHTML: `<i class="fas fa-cloud-showers-heavy"></i>`,
  },
  Snow: {
    iconHTML: `<i class="far fa-snowflake"></i>`,
  },
  Mist: {
    iconHTML: `<i class="fas fa-smog"></i>`,
  },
  Smoke: {
    iconHTML: `<i class="fas fa-smog"></i>`,
  },
  Haze: {
    iconHTML: `<i class="fas fa-smog"></i>`,
  },
  Dust: {
    iconHTML: `<i class="fas fa-smog"></i>`,
  },
  Fog: {
    iconHTML: `<i class="fas fa-smog"></i>`,
  },
  Sand: {
    iconHTML: `<i class="fas fa-smog"></i>`,
  },
  Ash: {
    iconHTML: `<i class="fas fa-smog"></i>`,
  },
  Squall: {
    iconHTML: `<i class="fas fa-smog"></i>`,
  },
  Tornado: {
    iconHTML: `<i class="fas fa-smog"></i>`,
  },
  Clear: {
    iconHTML: `<i class="fas fa-sun"></i>`,
  },
  Clouds: {
    iconHTML: `<i class="fas fa-cloud"></i>`,
  },
};

// CURRENT DATE

function formatDate (timestamp){  //date in milliseconds
  let now = new Date(timestamp);
  let minutes = now.getMinutes();  //shows minutes with 2 digits
    if (minutes < 10){
      minutes = `0${minutes}`;
    }

  let hours = now.getHours();  //shows hours with 2 digits
    if (hours < 10){
      hours = `0${hours}`;
    }

  
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let weekDay = weekDays[now.getDay()];

  let dayNumber = now.getDate();

  let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
  ];
let month = months[now.getMonth()];

  return `${weekDay}, ${dayNumber} ${month}, ${hours}:${minutes}`;
}



//CITY SEARCH (default city)
function search(city) {
  let apiKey = "10e6e87cefcedb53ba160de849dd0cf8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}


function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

//CHANGE WEATHER
function displayWeather(response) {

  let dateElement = document.querySelector("#date");              //display date
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  
  let iconElement = document.querySelector("#main-icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);



  let h1 = document.querySelector("h1");                          //display city
  h1.innerHTML = response.data.name;

  let descElement = document.querySelector("#weather-description"); //display weather description
  descElement.innerHTML = response.data.weather[0].main;

  let tempElement = document.querySelector("#temp");               //display temperature
  tempElement.innerHTML = Math.round(response.data.main.temp);

  let minTempElement = document.querySelector("#min-temp");         //display min temperature
  minTempElement.innerHTML = Math.round(response.data.main.temp_min);

  let maxTempElement = document.querySelector("#max-temp");         //display max temperature
  maxTempElement.innerHTML = Math.round(response.data.main.temp_max);

  //Display Celsius temperature per city

  celsiusTemperature = response.data.main.temp;


  //Weather details

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let pressureElement = document.querySelector("#pressure");
  pressureElement.innerHTML = `Pressure: ${response.data.main.pressure} hPa`;
}




//CURRENT GEOLOCATION

function showLocation(position) {
  let apiKey = "10e6e87cefcedb53ba160de849dd0cf8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentLocButton = document.querySelector("#current-location");
currentLocButton.addEventListener("click", getCurrentLocation);



//CELSIUS & FAHRENHEIT

function convertToFahrenheit(event){
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}


let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event){
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

}


let celsiusTemperature = null;  // added in displayWeather function to take Celsius info from API

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);



search("Sevilla");
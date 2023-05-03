function formatDate (timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
      if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`
}

function displayForecast () {
    let forecastElement = document.querySelector("#forecast");

    let days =["Thu", "Fri", "Sat", "Sun"];

    let forecastHTML = `<div class = "row">`;

    days.forEach(function(day){
        forecastHTML = forecastHTML + 
    `
              <div class="col-2">
                <div class="weather-forecast-date">${day}</div>
                <img
                  src="http://openweathermap.org/img/wn/10d.png"
                  alt=""
                  width="42px"
                />
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-max">18°</span>
                  <span class="weather-forecast-temperature-min">12°</span>
                </div>
              </div>
    `; 
    })
   
    forecastHTML  = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;

}

function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description")
    let humidityElement = document.querySelector("#humidity")
    let speedElement = document.querySelector("#wind")
    let dateElement = document.querySelector("#date")
    let iconElement = document.querySelector("#icon")

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    speedElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt *1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`);
    iconElement.setAttribute("alt", response.data.weather[0].description)
}

function search(city) {
let apiKey = "38f9fc1db6e0156a5e7d0c4ef4824562";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

}

function handleSubmit (event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value)
}

function displayFahrenheitTemperature (event) {
    event.preventDefault();
    let fahrenheitTemperature = (celsiusTemperature * 9)/5 + 32;
    let temperatureElement = document.querySelector("#temperature")
    celsiusLink.classList.remove("active")
    fahrenheitLink.classList.add("active")
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature")
    celsiusLink.classList.add("active")
    fahrenheitLink.classList.remove("active")
    temperatureElement.innerHTML = Math.round(celsiusTemperature);

}

let celsiusTemperature = null;


let form = document.querySelector ("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener ("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener ("click", displayCelsiusTemperature);

search("New York")
displayForecast();
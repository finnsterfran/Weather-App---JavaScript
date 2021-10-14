const api = {
    key: "936a35b6373da39470a3c393b65d5e5d",
    base: "https://api.openweathermap.org/data/2.5/"
}

const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
btn.addEventListener("click", getInput);

function getInput(event) {
   event.preventDefault();
   if(event.type == "click") {
       getData(search.value);
       console.log(search.value);
   }
}

function getData() {
    fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`).then(response => {
        return response.json();
    }).then(displayData);
}

function displayData(response) {
    console.log(response)
    if (response.cod == "404") {
        const error = document.querySelector(".error");
        error.textContent = "Please enter a valid city";
        search.value="";
        window.setTimeout(function(){location.reload()},1000)
    } else {
        const city = document.querySelector(".city");
        city.innerText = `${response.name}, ${response.sys.country}`;

        const today = new Date();
        const date = document.querySelector(".date");
        date.innerText = dateFunction(today);

        const temp = document.querySelector(".temp");
        temp.innerHTML = `Temp: <span>${Math.round(response.main.temp)}<span>°C</span></span>`;

        const weather = document.querySelector(".weather");
        weather.innerHTML = `Weather: <span>${response.weather[0].main}</span>`;

        const weatherDes = document.querySelector(".weather-des");
        weatherDes.innerHTML = `Description: <span>${response.weather[0].description}</span>`;

        const tempRange = document.querySelector(".temp-range");
        tempRange.innerHTML = `Temp Range: <span>${Math.round(response.main.temp_min)}°C / ${Math.round(response.main.temp_max)}°C</span>`;

        const weatherIcon = document.querySelector(".weather-icon");
        const iconURL = "http://openweathermap.org/img/w/";
        weatherIcon.src = iconURL + response.weather[0].icon + ".png";

        search.value = "";
    }
}

function dateFunction(d) {
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${date} ${month} ${year}`;
}
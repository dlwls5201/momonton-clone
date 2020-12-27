const weatherTitle = document.querySelector('.js-weather-title');

const API_KEY = '95db538b6436a37a603b10c6911d79a0';

function getWeather(lat, lng) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    )
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        const temperture = json.main.temp;
        const place = json.name;
        weatherTitle.innerText = `${temperture}℃ @ ${place}`
    })
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS_LS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("can't access location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS_LS);
    const currentUser = localStorage.getItem(CURRENT_USER_LS);
    console.log(`loadedCoords : ${loadedCoords} , currentUser : ${currentUser}`);

    if(currentUser === null) {
        return;
    }

    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();
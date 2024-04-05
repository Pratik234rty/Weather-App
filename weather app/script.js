const apiKey = '2bda6e3eddfcc2c2797e65ebabaf4696';

async function fetchWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("Unable to fetch weather data");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const cityElement = document.querySelector(".city");
const temperature = document.querySelector(".temp");
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");

const descriptionText = document.querySelector(".description-text");
const date = document.querySelector(".date");
const description = document.querySelector(".description i");

function updateWeatherUI(data) {
    cityElement.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    humidity.textContent = `${data.main.humidity}%`;
    visibility.textContent = `${data.visibility / 1000}km`;

    descriptionText.textContent = data.weather[0].description;

    const currentDate = new Date();
    date.textContent = currentDate.toDateString();
    const weatherIconName = getWeatherIconName(data.weather[0].main);
    description.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;
}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");

formElement.addEventListener('submit', async function(e) {
    e.preventDefault();

    const city = inputElement.value;
    if (city !== "") {
        fetchWeatherData(city)
        .then(data => {
            if (data) {
                updateWeatherUI(data);
                inputElement.value = "";
            } else {
                console.error("Failed to fetch weather data");
            }
        })
        .catch(error => {
            console.error(error);
        });
    }
});

function getWeatherIconName(weatherCondition) {
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        // Add more weather conditions here
        Drizzle: "cloud_drizzle",
        Thunderstorm: "wb_incandescent",
        Snow: "ac_unit",
        Mist: "blur_on",
        Smoke: "smoke_free",
        Haze: "filter_drama",
        Dust: "bubble_chart",
        Fog: "cloud",
        Sand: "waves",
        Ash: "nature_people",
        Squall: "airline_seat_recline_normal",
        Tornado: "wb_iridescent",
    };

    return iconMap[weatherCondition] || "help";
}

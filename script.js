const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const submitBtn = document.querySelector("button");

async function getWeatherInfo(city){
        try {
            if(city){
                const apikey = "ebf52c33ebd8ff5d573069fa6b77b01d";      
                const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
                const data = await fetch(api);
                const response = await data.json();
                console.log(response);
                displayWeatherData(response);
            }
            else{
                displayError("Please enter your city")
            }
        } catch (error) {
            // cityInput.value = "";
            displayError("error cod: 404! 'city not found'");
        }
}

submitBtn.addEventListener("click",function(e){
    e.preventDefault();
    getWeatherInfo(cityInput.value);
})

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.classList.add(".errorDisplay");
    errorDisplay.textContent = message;

    card.textContent = "";
    card.style.display = "block";
    card.append(errorDisplay);
}

function displayWeatherData(weatherData){
    const { name: city,
            main: {temp, humidity},
            weather:[{description , id}]
    } = weatherData;
    card.textContent = "";
    card.style.display = "block";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `Temp: ${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    weatherEmoji.textContent = getWeatherEmoji(id);
    descDisplay.textContent = description;
    
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    weatherEmoji.classList.add("weatherEmoji");
    descDisplay.classList.add("descDisplay");

    card.append(cityDisplay);
    card.append(tempDisplay);
    card.append(humidityDisplay);
    card.append(weatherEmoji);
    card.append(descDisplay);
};

function getWeatherEmoji(emojiId){


    switch(true){
        case(emojiId >= 200 && emojiId < 300):
            return "⛈️";
        case(emojiId >= 300 && emojiId < 400):
            return "🌦️";
        case(emojiId >= 400 && emojiId < 600):
            return "🌧️";
        case(emojiId >= 600 && emojiId < 700):
            return "🌨️";
        case(emojiId >= 700 && emojiId < 800):
            return "❄️";
        case(emojiId === 800):
            return "☀️";
        case(emojiId >= 801 && emojiId < 810):
            return "☁️";
        default:
            return "🌪️";
    }
}

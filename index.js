// Weather App

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".Card");
const apiKey = "INSERAPI KEY HERE";

weatherForm.addEventListener("submit", async event =>{

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }

    }
    else
    {
        displayError("please enter city");
    }

});


async function getWeatherData(city){
        const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        const response = await fetch(apiURL);

        console.log(response);

        if(!response.ok)
        {
            throw new Error("could not fetch weather data");
        
        }

        return await response.json();
}

    function displayWeatherInfo(data){
        const {name: city, 

            main: {temp, humidity}, 
 
            weather: [{description, id}]} = data;
 
 
          card.textContent = "";
         card.style.display = "flex";
 

        const cityDisplay = document.createElement("h1");
        const tempDisplay = document.createElement("p");
        const humidityDisplay = document.createElement("p");
        const descDisplay = document.createElement("p");
        const weatherEmoji = document.createElement("p");

        cityDisplay.textContent = city;
        tempDisplay.textContent = `${(temp-273.15).toFixed(1)}°C`;
        humidityDisplay.textContent = `Humidity${humidity}`;
        descDisplay.textContent = description;
        weatherEmoji.textContent = getWeatherEmoji(id);
        
        

        cityDisplay.classList.add("CityDisplay");
        tempDisplay.classList.add("tempDisplay");
        humidityDisplay.classList.add("humidityDisplay");
        descDisplay.classList.add("descDisplay");
        weatherEmoji.classList.add("weatherEmoji");


        card.appendChild(cityDisplay);
        card.appendChild(tempDisplay);
        card.appendChild(humidityDisplay);
        card.appendChild(descDisplay);
        card.appendChild(weatherEmoji);

    }


    function getWeatherEmoji(weather){

    switch(true){
        case (weather >= 200 && weather < 300): 
        return `⛈️`;
        case (weather >= 300 && weather < 400): 
        return `🌧️`;
        case (weather >= 400 && weather < 600): 
        return `☔`;
        case (weather >= 600 && weather < 700): 
        return `☃️`;
        case (weather >= 700 && weather < 800): 
       return `🌁`;
       case (weather = 800): 
        return `☀️`;
        case (weather >= 801): 
        return `☁️`;
        default: 
        return `🤷`;
    }

}

function displayError(message){
    
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("ErrorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);

}

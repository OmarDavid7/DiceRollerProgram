const weatherForm = document.querySelector('.weatherform')
const cityInput = document.querySelector('.cityInput')
const card = document.querySelector('.card')
const APIKEY = "1cf03690b80df4a77fa8d987a86b310a"

weatherForm.addEventListener("submit", async (e) =>{
    e.preventDefault()

    const city = cityInput.value

    if(city){
        try {
            const weatherData = await getWeatherData(city)
            displayWeatherInfo(weatherData)

        } catch (error) {
            console.error(error)
            displayError(error)
        }
    }else{
        displayError("Please enter a city")
    }

})

const getWeatherData = async (city)=>{
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}`
    const response = await fetch(apiURL)
    
    if(!response.ok){
        throw new Error("Could not fetch weather data")
    }

    return await response.json()
}

const displayWeatherInfo = (data)=>{
    const {name: city, main: {temp,humidity}, weather: [{description,id}]} = data

    card.textContent = ""
    card.style.display = "flex"

    const cityDisplay = document.createElement("h1")
    const tempDisplay = document.createElement("p")
    const humidityDisplay = document.createElement("p")
    const descDisplay = document.createElement("p")
    const weatherEmoji = document.createElement("p")

    cityDisplay.textContent = city
    tempDisplay.textContent = `${(temp -273.5).toFixed(1)}°C`
    humidityDisplay.textContent = `Humidity: ${humidity}`
    descDisplay.textContent = description
    weatherEmoji.textContent = getWeatherEmoji(id)

    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add('temDisplay');
    humidityDisplay.classList.add('humidityDisplay')
    descDisplay.classList.add("descDisplay")
    weatherEmoji.classList.add('weatherEmoji')

    card.appendChild(cityDisplay)
    card.appendChild(tempDisplay)
    card.appendChild(humidityDisplay)
    card.appendChild(descDisplay) 
    card.appendChild(weatherEmoji)
}

const getWeatherEmoji = (weatherId)=>{
    switch(true){
        case (weatherId >= 200 && weatherId <300):
            return "🌪️"
        case (weatherId >= 300 && weatherId <400):
            return "🌧️"
        case (weatherId >= 500 && weatherId <600):
            return "🌨️"
        case (weatherId >= 600 && weatherId <700):
            return "❄️"
        case (weatherId >= 700 && weatherId <800):
            return "❄️"
        case (weatherId === 800):
            return "☀️" 
        case  (weatherId >= 801 && weatherId <810):
            return "☁️"
            default:
                return "❓";
    }
}

const displayError = (message)=>{
    const errorDisplay = document.createElement("p")
    errorDisplay.textContent = message
    errorDisplay.classList.add("errorDisplay")

    card.textContent = ""
    card.style.display = "flex"
    card.appendChild(errorDisplay)
}
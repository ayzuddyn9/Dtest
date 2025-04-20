function getWeatherData(city) {
    const weatherKey = "6fe17d78e8fb781705d804097c5148f3"
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}&units=metric`
  
    return fetch(weatherUrl)
      .then(response => response.json())
      .then(data => {
        if (data.cod !== 200) throw new Error(data.message);
        return {
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
          description: data.weather[0].description,
          temperature: data.main.temp,
          country: data.sys.country
        };
      });
}
  
function getCityImage(city) {
    const pexelsKey = "jyoAgN3TRVXxpx410BH7vtJGuj6inWKpn4lwRRX1OifAfvNLLNmND5RW"
    const imageUrl = `https://api.pexels.com/v1/search?query=${city}&per_page=1`
  
    return fetch(imageUrl, {
      headers: { Authorization: pexelsKey }
    })
      .then(response => response.json())
      .then(data => {
        const photo = data.photos && data.photos[0]
        return photo ? photo.src.medium : null
      })
}

function getFlagUrl(countryCode) {
    return `https://flagsapi.com/${countryCode}/shiny/64.png`
}

function getCityDescription(city) {
    const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${city}`;
  
    return fetch(wikiUrl)
      .then(response => {
        if (!response.ok) throw new Error("Wikipedia data not found");
        return response.json();
      })
      .then(data => {

        return data.extract ? data.extract : "No description available from Wikipedia.";
      });
}

document.getElementById("searchButton").addEventListener("click", () => {
    const city = document.getElementById("searchInput").value.trim()
    if (!city) {
      alert("Please enter a city name")
      return
    }
  
    getWeatherData(city)
      .then(weather => {
        const flagUrl = getFlagUrl(weather.country)
        return getCityImage(city).then(imageUrl => {
          return { weather, flagUrl, imageUrl }
        });
      })
      .then(data => {
        const { weather, flagUrl, imageUrl } = data
  
        const newContainer = document.createElement("div")
        newContainer.classList.add("container")
        newContainer.style.marginTop = "20px"
  
        newContainer.innerHTML = `
          <div class="cardContent">
            <img src="${imageUrl}" alt="City  Image" class="city-image">
            <div class="cityInfo">
              <div class="cityHeader">
                <h2 class="cityName">${city}</h2>
                <img src="${flagUrl}" alt="Flag" class="city-flag">
              </div>
              <div class="weatherIcon">
                <img src="${weather.icon}" alt="Weather Icon">
              </div>
              <p class="cityDescription">
                ${data.extract}, ${weather.temperature}°C
              </p>
            </div>
          </div>
        `
  
        document.body.appendChild(newContainer);
      })
      .catch(err => {
        console.error(err);
        alert("Something went wrong. Please try again.")
      })
  })



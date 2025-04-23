function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function fetchImage(city) {
    const pexelKey = "jyoAgN3TRVXxpx410BH7vtJGuj6inWKpn4lwRRX1OifAfvNLLNmND5RW"
    const imageUrl = `https://api.pexels.com/v1/search?query=${city}&per_page=1`
    
    fetch(imageUrl, {headers:{ Authorization: pexelKey}})
    .then(response => { 
        if(!response.ok) throw new Error('Image not Found')
        return response.json()})
    .then(data => {
        if (data.photos && data.photos.length > 0) {
            const imageUrl = data.photos[0].src.medium
            const extraInfoHtml= `<img src="${imageUrl}" alt="City Image" class="image">`
            document.getElementById('resultImg').innerHTML = extraInfoHtml
        } else { 
            document.getElementById('resultImg').innerHTML = `<p>No image available for ${city}.</p>`

        }

    })
    .catch(error=> {
        document.getElementById('result').innerHTML = `<p>Error fetching image: ${error.message}</p>`
    })
}

function fetchCityDescription(city) {
    const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${city}?redirect=true`

    return fetch(wikiUrl)
    .then(response => {
        if(!response.ok) throw new Error('City description not found')
        return response.json()
    })
    .then(data => {
        const descriptionHtml = `<p>${data.extract || 'No description available.'}</p>`
        document.getElementById('result1Des').innerHTML = descriptionHtml
    })
    .catch(error => {
        document.getElementById('result1Des').innerHTML =`<p>Error fetching description: ${error.message}</p>`
    }) 
        
    
}

function fetchWeather(city) {
    const weatherKey = "6fe17d78e8fb781705d804097c5148f3"
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherKey}&units=metric`
    
    return fetch(weatherUrl)
        .then(response => { 
            if (!response.ok) throw new Error('City not Found')
            return response.json()
        })
        .then(data => {
            const countryCode = data.sys.country
            const flagUrl = `https://flagsapi.com/${countryCode}/shiny/64.png`
            const weatherHtml = ` <p class="temp">${Math.round(data.main.temp)}</p>
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="">
                <p class="tempDescription">${data.weather[0].description}</p>`
            document.getElementById('resultWeather').innerHTML = weatherHtml
        })
        .catch(error => {
            document.getElementById('resultWeather').innerHTML = `<p>Error fetching weather: ${error.message}</p>`
        })
}



document.getElementById('searchButton').addEventListener('click', ()=> {
    const city = document.getElementById('searchInput').value.trim()
    if(!city){
        alert("Please enter a city name")
        return
    }
    
    document.getElementById('resultImg').innerHTML = ''
    document.getElementById('result1Des').innerHTML = ''
    document.getElementById('resultWeather').innerHTML = ''

    fetchImage(city) 
    fetchCityDescription(city)
    fetchWeather(city)
    getFlagUrl(city ,countryCode)

})
    


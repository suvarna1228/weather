function getWeather() {
    const apiKey = 'f562c213ec3e43f243b37e0395157d99';
    const city = document.getElementById('city').value;
    const cityInput = city.value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
            city.value = '';
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15); // Convert Kelvin to Celsius
        const iconCode = data.weather[0].icon;
        const description = data.weather[0].description;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHtml = `<p>${temperature}°C</p>`;
        const cityNameHtml = `<h3>${cityName}</h3>`;
        const weatherHTML = cityNameHtml + temperatureHtml;

        weatherInfoDiv.innerHTML = weatherHTML;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0, 8); // 3-hour intervals, so 8 gives the next 24 hours

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15); // Convert Kelvin to Celsius
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const hourlyItemHTML = `
        <div class="hourly-item">
            <span>${hour}:00</span>
            <img src="${iconUrl}" alt="Hourly Weather Icon">
            <span>${temperature}°C</span>
        </div>`;

        hourlyForecastDiv.innerHTML += hourlyItemHTML;
    });
}

function showImage() {
    const weatherIcon = document.getElementById("weather-icon");
    weatherIcon.style.display = 'block';
}


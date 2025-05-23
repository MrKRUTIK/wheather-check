// Function to fetch weather data from OpenWeatherMap API
function getWeather() 
{
    const city = document.getElementById('city').value.trim();
    const apiKey = 'c889152838de5ef00e8a566260602085'; // Replace with your OpenWeatherMap API Key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // If the city input is empty, show an alert
    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    // Fetch the weather data from the OpenWeatherMap API
    fetch(apiUrl)
        .then(response => {
            console.log(response); // Log the response to the console
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the data to inspect it
            if (data.cod === 404) {
                document.getElementById('weather-info').innerHTML = `<p>City not found.</p>`;
            } else {
                const temp = data.main.temp;
                const description = data.weather[0].description;
                const capitalizedDesc = description.charAt(0).toUpperCase() + description.slice(1);
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                document.getElementById('weather-info').innerHTML = `
                    <h2>${city}</h2>
                    <p><strong>Temperature:</strong> ${temp}°C</p>
                    <p><strong>Description:</strong> ${description}</p>
                    <p><strong>Humidity:</strong> ${humidity}%</p>
                    <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
                `;
            }
        })
        .catch(error => {
            console.error('Error:', error); // Log the error
            document.getElementById('weather-info').innerHTML = '<p><b>Not Found city , try again...</b></p>';

        });
}

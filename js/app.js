const form = document.getElementById('weather-form');
const card = document.getElementById('weather-card');
const errorMsg = document.getElementById('error-message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = document.getElementById('city-input').value.trim();
    
    try {
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
        const geoData = await geoRes.json();
        
        if (!geoData.results) throw new Error();

        const { latitude, longitude, name, country } = geoData.results[0];
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const data = await weatherRes.json();

        document.getElementById('city-name').textContent = `${name}, ${country}`;
        document.getElementById('temperature').textContent = `${data.current_weather.temperature}°C`;
        document.getElementById('wind-speed').textContent = `${data.current_weather.windspeed} km/h`;
        
        card.classList.remove('hidden');
        errorMsg.textContent = "";
    } catch (err) {
        errorMsg.textContent = "Aucun résultat trouvé.";
        card.classList.add('hidden');
    }
});
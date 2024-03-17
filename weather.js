async function fetchData(city){
    try{
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lng}&current_weather=true`);
        const data = await response.json();

        return{
            cityName: city.name,
            weather: data.current_weather.temperature,
            units: data.current_weather_units.temperature
        }  
    } catch(error){
        console.error('Error fetching data:', error);
    }
    
}

module.exports = fetchData
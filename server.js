const http = require('http');
const url = require('url');
const cities = require('./cities');
const fetchData = require('./weather');

const server = http.createServer(async(req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (path === `/weather`){
        // Handle the '/weather' endpoints
        if (query.name) {
            const cityName = query.name;
            // Find the city with the given name in the cities array
            const city = cities.find(city => city.name.toLowerCase() === cityName.toLowerCase());

            if (city) {
                const weatherData = await fetchData(city);

                res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8'});
                res.end(`the temperature in ${weatherData.cityName} is ${weatherData.weather}${weatherData.units}`);
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('City not found');
            }
        } else {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('Missing city name parameter');
        }
    
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Endpoint not found');
    }
});

// Start Listening for Requests
server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
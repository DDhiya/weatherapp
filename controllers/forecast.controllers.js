const axios = require("axios");
const { weatherIcons } = require("../public/icons");
const { OPEN_CAGE_KEY } = require("../config/secrets");

const searchForecast = async (req, res) => {
    try {
        const geoLocation = await axios.get("https://api.opencagedata.com/geocode/v1/json?q="+req.query.q+"&key="+OPEN_CAGE_KEY);

        if (geoLocation.data.total_results != 0) {
            const placeInfo = {
                name: geoLocation.data.results[0].formatted,
                latitude: geoLocation.data.results[0].geometry.lat,
                longitude: geoLocation.data.results[0].geometry.lng
            }

            const forecastResult = await axios.get("https://api.open-meteo.com/v1/forecast?latitude="+placeInfo.latitude+"&longitude="+placeInfo.longitude+"&hourly=temperature_2m,weathercode,windspeed_10m,winddirection_10m&current_weather=true&forecast_days=1");

            const currentWeather = {
                temperature: forecastResult.data.current_weather.temperature_2m,
                windSpeed: forecastResult.data.current_weather.windspeed,
                windDirection: forecastResult.data.current_weather.winddirection
            }

            const formattedTime = forecastResult.data.hourly.time.map((t) => {
                const date = new Date(t);
                return date.toLocaleTimeString().toUpperCase();
            })

            const forecastWeather = {
                time: formattedTime,
                temperature: forecastResult.data.hourly.temperature_2m,
                weatherCode: forecastResult.data.hourly.weathercode,
            }

            res.render("forecast", { search: req.query.q, place: placeInfo, current: currentWeather, forecast: forecastWeather, icon: weatherIcons });
        }

        else {
            res.render("error", { error: "location not found" });
        }

    }catch (error) {
        res.render("error", { error: "no location entered" });
    }

}

module.exports = { searchForecast };
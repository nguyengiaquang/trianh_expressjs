import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

class WeatherService {
    static async getCurrentWeather() {
        const cityName = "HaNoi";
        const res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
            params: {
                q: cityName,
                appid: process.env.WEATHER_API_KEY
            }
        })
        const {main} = res.data;
        const tempCurrent = Math.floor(main.temp - 273);
        const data = {tempCurrent}
        return data;
    }
}

export default WeatherService;
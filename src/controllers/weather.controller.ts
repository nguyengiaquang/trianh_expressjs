import { type Request, type Response } from "express";
import WeatherService from "../services/weather.service.ts";

class WeatherController {
    static async index(req: Request, res: Response) {
        const data = await WeatherService.getCurrentWeather();
        res.render("weather/index", {data})
    }
}

export default WeatherController;
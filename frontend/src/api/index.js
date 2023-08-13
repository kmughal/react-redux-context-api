import { useQuery } from "react-query"

export const getWeatherData = () => {
    return useQuery(
        ["weather-data"],
        async () => {
            const res = await fetch('http://localhost:5073/WeatherForecast')
            const json = await res.json()
            return json

        })
}
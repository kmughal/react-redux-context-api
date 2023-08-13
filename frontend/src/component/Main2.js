
import React from "react"
import { useSampleContext } from ".."
import { getWeatherData } from "../api";

export const Main2 = () => {
    const ctx = useSampleContext();

    const { data, isSuccess } = getWeatherData();
    React.useEffect(() => {
        isSuccess && ctx.setData({ ...ctx.data, weatherData: data })
    }, [isSuccess])
    return <>
        <button onClick={() => {
            ctx.setData({ ...ctx.data, counter: ctx.data.counter + 1 })

        }}>Counter ={ctx.data.counter}</button>

        {isSuccess && ctx.data.weatherData.map(d => {
            return <div>
                <h2>{d.date} = {d.temperatureC}</h2>
                <p>{d.summary}</p>
            </div>
        })}
    </>

}
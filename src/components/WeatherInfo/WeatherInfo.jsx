import React from "react"

import NowCard from "../WeatherNow/NowCard"
import OtherMetrics from "../WeatherNow/NowMetrics"
import DailyForecast from "../Daily/DailyForecast"
import HourlyForecast from "../Hourly/HourlyForecast"


export default function WeatherInfo({ weatherData: data, units }) {
    return (
        <div className="weather-main__info">
            <section className="weather-now">
                <header className="sr-only weather-now__header">
                    <h2 className="sr-only">Current Weather</h2>
                </header>

                <NowCard data={data} units={units} />

                <OtherMetrics data={data} units={units} />
            </section>

            <DailyForecast data={data} units={units} />

            <HourlyForecast data={data} units={units} />
        </div>
    )
}
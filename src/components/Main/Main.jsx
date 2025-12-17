import React from "react"
import "./Main.css"

import LocationSearchForm from "../LocationSearch/LocationSearchForm"
import WeatherInfo from "../WeatherInfo/WeatherInfo"
import WeatherInfoLoading from "../WeatherInfo/WeatherInfoLoading"


export default function Main({ weatherData, setWeatherData, units, setLocation }) {
    return (
        <main className="weather-main">

            <h1 className="weather-main__heading">
                How's the sky looking today?
            </h1>

            <section className="weather-main__content">

                <LocationSearchForm setLocation={setLocation} setWeatherData={setWeatherData} />

                {weatherData
                    ? <WeatherInfo weatherData={weatherData} units={units} />
                    : <WeatherInfoLoading />
                }

            </section>

        </main>
    )
}
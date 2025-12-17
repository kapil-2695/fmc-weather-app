import React from "react"
import "./DailyForecast.css"

import { weatherIconFromCode } from "../../js/dataFormatting"


export default function DailyForecast({ data, units }) {
    const { daily } = data
    return (
        <section className="daily-forecast">

            <header className="daily-forecast__header">
                <h2 className="daily-forecast__heading sub-heading">Daily forecast</h2>
            </header>

            <main className="daily-forecast__main">
                {daily.map((day) => {
                    const { icon, descr } = weatherIconFromCode(day.weatherCode)

                    return (<article className="daily-card" key={day.weekday}>
                        <h3 className="daily-card__heading">{day.weekday.slice(0, 3)}</h3>
                        <figure className="daily-card__symbol">
                            <img src={icon} alt={descr} />
                        </figure>
                        <div className="daily-card__temp">
                            <p className="daily-card__temp__high">{day.tempMax[units.temp]}°</p>
                            <p className="daily-card__temp__low">{day.tempMin[units.temp]}°</p>
                        </div>
                    </article>)
                })}
            </main>

        </section>
    )
}
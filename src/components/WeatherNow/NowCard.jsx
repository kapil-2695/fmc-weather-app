import React from "react"
import "./NowCard.css"

import { formatInTimeZone } from "date-fns-tz"
import { weatherIconFromCode } from "../../js/dataFormatting"


export default function NowCard({ data, units }) {
    const { current } = data
    const { icon, descr } = weatherIconFromCode(current.weatherCode)


    return (
        <section className="now-card">
            <div className="now-card__location-time">
                <h3 className="now-card__location">
                    {data.location.location}
                </h3>
                <p className="now-card__time">
                    {formatInTimeZone(current.datetime, data.timezone, "eeee, MMM d, yyyy")}
                </p>
            </div>

            <div className="now-card__temp">
                <figure className="now-card__temp__symbol">
                    <img src={icon} alt={descr} />
                </figure>
                <p className="now-card__temp__value">{current.temp[units.temp]}°</p>
            </div>
        </section>
    )
}
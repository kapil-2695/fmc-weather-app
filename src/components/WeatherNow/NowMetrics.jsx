import React from "react"
import "./NowMetrics.css"


export default function OtherMetrics({ data, units }) {
    const { current } = data


    return (
        <section className="now-metrics">

            <article className="now-metrics__article feels-like">
                <h3 className="now-metrics__name">Feels like</h3>
                <p className="now-metrics__value feels-like__value">
                    {current["feelsLike"][units.temp]}° {units.temp}
                </p>
            </article>

            <article className="now-metrics__article humidity">
                <h3 className="now-metrics__name">Humidity</h3>
                <p className="now-metrics__value humidity__value">
                    {current["humidity"]}%
                </p>
            </article>

            <article className="now-metrics__article wind">
                <h3 className="now-metrics__name">Wind</h3>
                <p className="now-metrics__value wind__value">
                    {current["wind"][units.wind]} {units.wind}
                </p>
            </article>

            <article className="now-metrics__article precipitation">
                <h3 className="now-metrics__name">Precipitation</h3>
                <p className="now-metrics__value precipitation__value">
                    {current["precip"][units.precip]} {units.precip}
                </p>
            </article>

        </section>
    )
}
import React from "react"
import "./WeatherInfoLoading.css"

import iconLoading from "../../assets/images/icon-loading.svg"
import iconDropdown from "../../assets/images/icon-dropdown.svg"


export default function WeatherInfoLoading() {
    const otherMetrics = ["Feels like", "Humidity", "Wind", "Precipitation"]


    return (
        <div className="weather-main__info loading-state">

            <section className="weather-now">
                <header className="sr-only weather-now__header">
                    <h2 className="sr-only">Current Weather</h2>
                </header>

                <section className="now-card">
                    <figure className="now-card__loading-icon">
                        <img src={iconLoading} alt="" />
                    </figure>
                    <p className="now-card__loading-msg">Loading ...</p>
                </section>

                <section className="now-metrics">
                    {otherMetrics.map((metric) => (
                        <article className="now-metrics__article feels-like" key={metric}>
                            <h3 className="now-metrics__name">{metric}</h3>
                            <p className="now-metrics__value feels-like__value">-</p>
                        </article>
                    ))}
                </section>
            </section>


            <section className="daily-forecast">
                <header className="daily-forecast__header">
                    <h2 className="daily-forecast__heading sub-heading">Daily forecast</h2>
                </header>

                <main className="daily-forecast__main">
                    {Array(7).fill(0).map((item, index) => (
                        <article className="daily-card" key={index}>
                            <h3 className="daily-card__heading"></h3>
                            <figure className="daily-card__symbol"></figure>
                            <div className="daily-card__temp">
                                <p className="daily-card__temp__high"></p>
                                <p className="daily-card__temp__low"></p>
                            </div>
                        </article>
                    ))}
                </main>
            </section>


            <section className="hourly-forecast">
                <header className="hourly-forecast__header">
                    <h2 className="hourly-forecast__heading sub-heading">Hourly forecast</h2>

                    <article className="dropdown-container hourly-forecast__days-menu">
                        <div role="button" className="dropdown-btn hourly-dropdown-btn">
                            <span>-</span>
                            <figure className="dropdown-icon">
                                <img src={iconDropdown} alt="" />
                            </figure>
                        </div>
                    </article>
                </header>

                <main className="hourly-forecast__main">
                    {Array(8).fill(0).map((item, index) => (
                        <article className="hourly-card" key={index}>
                            <div className="hourly-card__time-symbol">
                                <figure className="hourly-card__symbol"></figure>
                                <p className="hourly-card__time"></p>
                            </div>
                            <p className="hourly-card__temp"></p>
                        </article>
                    ))}
                </main>
            </section>

        </div>
    )
}
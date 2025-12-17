import React from "react"
import "./HourlyForecast.css"

import useDropdownToggle from "../../hooks/useDropdownToggle"
import { formatInTimeZone } from "date-fns-tz"

import { weatherIconFromCode } from "../../js/dataFormatting"

import iconDropdown from "../../assets/images/icon-dropdown.svg"


export default function HourlyForecast({ data, units }) {
    const { current, daily, hourly } = data
    const today = formatInTimeZone(current.datetime, data.timezone, "eeee")
    const currentDatetime = current.datetime.split(":")[0]

    const [weekFilter, setWeekFilter] = React.useState(today)
    const [open, toggleFilterDropdown, filterRef] = useDropdownToggle(true)

    const filtredHours = hourly.filter((hourData) => {
        const hourDatetime = hourData.datetime.split(":")[0]
        const hourWeek = hourData.weekday
        return hourDatetime >= currentDatetime && hourWeek === weekFilter
    })


    return (
        <section className="hourly-forecast">

            <header className="hourly-forecast__header">
                <h2 className="hourly-forecast__heading sub-heading">Hourly forecast</h2>

                <article
                    ref={filterRef}
                    className="dropdown-container hourly-forecast__days-menu"
                >
                    <button onClick={toggleFilterDropdown}>
                        <div className="dropdown-btn hourly-dropdown-btn">
                            <span>{weekFilter}</span>
                            <figure className="dropdown-icon">
                                <img src={iconDropdown} alt="" />
                            </figure>
                        </div>
                    </button>

                    <menu className={`dropdown-menu hourly-dropdown-menu ${open && "show"}`}>
                        {daily.map((day) => (
                            <button
                                key={day.weekday}
                                className={`menu-list-item ${weekFilter === day.weekday && "checked"}`}
                                onClick={() => {
                                    setWeekFilter(day.weekday)
                                    if (open) toggleFilterDropdown()
                                }}
                            >
                                <p>{day.weekday}</p>
                            </button>
                        ))}
                    </menu>
                </article>

            </header>

            <main className="hourly-forecast__main">
                {filtredHours.map((hour) => {
                    const { icon, descr } = weatherIconFromCode(hour.weatherCode)
                    return (
                        <article key={hour.hour} className="hourly-card">
                            <div className="hourly-card__time-symbol">
                                <figure className="hourly-card__symbol">
                                    <img src={icon} alt={descr} />
                                </figure>
                                <p className="hourly-card__time">{hour.hour}</p>
                            </div>
                            <p className="hourly-card__temp">{hour.temp[units.temp]}° {units.temp}</p>
                        </article>
                    )
                })}

            </main>

        </section>
    )
}
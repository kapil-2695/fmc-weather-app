import React from "react"
import "./Header.css"

import useDropdownToggle from "../../hooks/useDropdownToggle"

import appLogo from "../../assets/images/logo.svg"
import unitsIcon from "../../assets/images/icon-units.svg"
import dropdownIcon from "../../assets/images/icon-dropdown.svg"
import checkmarkIcon from "../../assets/images/icon-checkmark.svg"


export default function Header({ units, setUnits }) {
    const [open, toggleMenu, dropdownRef] = useDropdownToggle(true)

    function switchUnits() {
        if (units.type === "metric")
            setUnits({ temp: "F", wind: "mph", precip: "in", type: "imperial" })
        else
            setUnits({ temp: "C", wind: "kmph", precip: "mm", type: "metric" })
        if (open) toggleMenu()
    }

    function chooseUnit(value) {
        if (value === "C" || value === "F") setUnits(p => ({ ...p, temp: value }))
        if (value === "kmph" || value === "mph") setUnits(p => ({ ...p, wind: value }))
        if (value === "mm" || value === "in") setUnits(p => ({ ...p, precip: value }))
        if (open) toggleMenu()
    }

    const checkmark =
        (<figure className="checkmark">
            <img src={checkmarkIcon} alt="" />
        </figure>)


    return (
        <header className="weather-header">
            <figure className="weather-header__logo">
                <img src={appLogo} alt="app logo" />
            </figure>

            <article ref={dropdownRef} className="dropdown-container weather-header__units">
                <button type="button" onClick={toggleMenu}>
                    <div className="dropdown-btn units-dropdown-btn"                     >
                        <figure className="units-icon">
                            <img src={unitsIcon} alt="" />
                        </figure>
                        <span>Units</span>
                        <figure className="dropdown-icon">
                            <img src={dropdownIcon} alt="" />
                        </figure>
                    </div>
                </button>

                <menu className={`dropdown-menu units-dropdown-menu ${open && "show"}`}>
                    <button
                        className="units-switch-btn menu-list-item"
                        onClick={switchUnits}
                    >
                        Switch to {units.type === "metric" ? "Imperial" : "Metric"}
                    </button>
                    <div className="units-submenu temperature-menu">
                        <h4 className="submenu-heading">Temperature</h4>
                        <ul>
                            <button
                                className="menu-list-item"
                                onClick={() => chooseUnit("C")}
                            >
                                <p>Celsius (°C)</p>
                                {units.temp === "C" && checkmark}
                            </button>
                            <button
                                className="menu-list-item"
                                onClick={() => chooseUnit("F")}
                            >
                                <p>Fahrenheit (°F)</p>
                                {units.temp === "F" && checkmark}
                            </button>
                        </ul>
                    </div>
                    <hr className="menu-sep" />
                    <div className="units-submenu wind-menu">
                        <h4 className="submenu-heading">Wind Speed</h4>
                        <ul>
                            <button
                                className="menu-list-item"
                                onClick={() => chooseUnit("kmph")}
                            >
                                <p>km/h</p>
                                {units.wind === "kmph" && checkmark}
                            </button>
                            <button
                                className="menu-list-item"
                                onClick={() => chooseUnit("mph")}
                            >
                                <p>mph</p>
                                {units.wind === "mph" && checkmark}
                            </button>
                        </ul>
                    </div>
                    <hr className="menu-sep" />
                    <div className="units-submenu precipitation-menu">
                        <h4 className="submenu-heading">Precipitation</h4>
                        <ul>
                            <button
                                className="menu-list-item"
                                onClick={() => chooseUnit("mm")}
                            >
                                <p>Millimeters (mm)</p>
                                {units.precip === "mm" && checkmark}
                            </button>
                            <button
                                className="menu-list-item"
                                onClick={() => chooseUnit("in")}
                            >
                                <p>Inches (in)</p>
                                {units.precip === "in" && checkmark}
                            </button>
                        </ul>
                    </div>

                </menu>
            </article>
        </header>
    )
}
import React from "react"

import Header from "./components/Header/Header"
import Main from "./components/Main/Main"
import ApiErrorPage from "./components/ApiErrorPage"

import { getLocation } from "./js/fetchGeolocation"
import { fetchWeatherData } from "./js/fetchData"

const setDefaultUnits = () => ({ temp: "C", wind: "kmph", precip: "mm", type: "metric" })

const defaultLocation = () => ({
    latitude: 28.6139, longitude: 77.2088,
    timezone: "Asia/Calcutta", location: "New Delhi, India"
})


export default function App() {
    const [units, setUnits] = React.useState(setDefaultUnits)
    const [weatherData, setWeatherData] = React.useState(null)
    const [location, setLocation] = React.useState(defaultLocation)
    const [apiError, setApiError] = React.useState(false)

    React.useEffect(() => {
        getLocation()
            .then((data) => setLocation(data))
            .catch((error) => {
                let errorMsg = "";
                if (error?.code === 1) {
                    errorMsg = "Location permission denied."
                } else if (error?.code === 2) {
                    errorMsg = "Position unavailable."
                } else if (error?.code === 3) {
                    errorMsg = "System Timeout. Please try again."
                } else {
                    errorMsg = "Something went wrong while fetching location"
                }
                console.log(errorMsg, "App page")
            })
    }, [])


    React.useEffect(() => {
        setWeatherData(null)
        fetchWeatherData(location)
            .then((data) => setWeatherData(data))
            .catch((error) => {
                setApiError(true)
                setWeatherData(null)
                console.log("Something went wrong. API error. " + error.message)
            })
    }, [location])


    return (
        <>
            <Header units={units} setUnits={setUnits} />
            {!apiError
                ? <Main
                    weatherData={weatherData}
                    setWeatherData={setWeatherData}
                    units={units}
                    setLocation={setLocation}
                />
                : <ApiErrorPage setLocation={setLocation} setApiError={setApiError} />
            }
        </>
    )
}
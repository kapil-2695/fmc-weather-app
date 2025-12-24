import { formatWeatherData } from "./dataFormatting"


export async function fetchSearchResults(name, limit = 5) {
    const url = `/.netlify/functions/geoapifyAddressSearch?text=${name}&limit=${limit}`
    try {
        const response = await fetch(url)
        const data = await response.json()
        return data?.features || []
    }
    catch (err) {
        throw new Error("Something went wrong with the search.")
    }
}


export async function fetchWeatherData(location) {
    const url = new URL("https://api.open-meteo.com/v1/forecast")
    const searchParams = new URLSearchParams({
        latitude: location.latitude,
        longitude: location.longitude,
        models: "gfs_seamless",
        daily: "temperature_2m_max,temperature_2m_min,weather_code",
        hourly: "temperature_2m,weather_code",
        current: "temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,apparent_temperature,weather_code",
        timezone: location.timezone,
    })
    url.search = searchParams.toString()
    const urlString = url.toString()

    try {
        const response = await fetch(urlString)
        const data = await response.json()
        return formatWeatherData(data, location)
    }
    catch (error) {
        throw new Error("Something went wrong with the weather data.")
    }
}

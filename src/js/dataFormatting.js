import { formatInTimeZone } from "date-fns-tz"

/* weather icon imports */
import iconDrizzle from "../assets/images/icon-drizzle.webp"
import iconFog from "../assets/images/icon-fog.webp"
import iconOvercast from "../assets/images/icon-overcast.webp"
import iconPartlyCloudy from "../assets/images/icon-partly-cloudy.webp"
import iconRain from "../assets/images/icon-rain.webp"
import iconSnow from "../assets/images/icon-snow.webp"
import iconStorm from "../assets/images/icon-storm.webp"
import iconSunny from "../assets/images/icon-sunny.webp"


const convertC2F = C => 1.8 * C + 32.0
const convertMm2In = mm => mm / 25.4
const convertKph2Mph = kph => kph / 1.6


/* formatting functions */
function formatCurrentWeatherData(data) {
    const current = {
        datetime: data["current"]["time"],
        temp: {
            C: data["current"]["temperature_2m"].toFixed(0),
            F: convertC2F(data["current"]["temperature_2m"]).toFixed(0)
        },
        wind: {
            kmph: data["current"]["wind_speed_10m"].toFixed(0),
            mph: convertKph2Mph(data["current"]["wind_speed_10m"]).toFixed(0),
        },
        precip: {
            mm: data["current"]["precipitation"].toFixed(1),
            in: convertMm2In(data["current"]["precipitation"]).toFixed(1)
        },
        feelsLike: {
            C: data["current"]["apparent_temperature"].toFixed(0),
            F: convertC2F(data["current"]["apparent_temperature"]).toFixed(0)
        },
        humidity: data["current"]["relative_humidity_2m"].toFixed(0),
        weatherCode: data["current"]["weather_code"]
    }
    return current
}

function formatDailyWeatherData(data) {
    const daily = []
    const dailyLength = data["daily"]["time"].length

    for (let i = 0; i < dailyLength; i++) {
        const date = data["daily"]["time"][i]
        daily.push({
            datetime: date,
            weekday: formatInTimeZone(date, data["timezone"], "eeee"),
            tempMax: {
                C: data["daily"]["temperature_2m_max"][i].toFixed(0),
                F: convertC2F(data["daily"]["temperature_2m_max"][i]).toFixed(0)
            },
            tempMin: {
                C: data["daily"]["temperature_2m_min"][i].toFixed(0),
                F: convertC2F(data["daily"]["temperature_2m_min"][i]).toFixed(0)
            },
            weatherCode: data["daily"]["weather_code"][i]
        })
    }
    return daily
}

function formatHourlyWeatherData(data) {
    const hourly = []
    const hourlyLength = data["hourly"]["time"].length

    for (let i = 0; i < hourlyLength; i++) {
        const date = data["hourly"]["time"][i]
        hourly.push({
            datetime: date,
            hour: formatInTimeZone(date, data["timezone"], "h a"),
            weekday: formatInTimeZone(date, data["timezone"], "eeee"),
            temp: {
                C: data["hourly"]["temperature_2m"][i].toFixed(0),
                F: convertC2F(data["hourly"]["temperature_2m"][i]).toFixed(0)
            },
            weatherCode: data["hourly"]["weather_code"][i],
        })
    }
    return hourly
}


/* final functions to export */
export function formatWeatherData(data, location) {
    return {
        current: formatCurrentWeatherData(data),
        daily: formatDailyWeatherData(data),
        hourly: formatHourlyWeatherData(data),
        timezone: data["timezone"],
        multipleTimezones: !location.timezone,
        location
    }
}


export function weatherIconFromCode(code) {
    switch (code) {
        case 0: case 1: return { icon: iconSunny, descr: "sunny" };

        case 2: return { icon: iconPartlyCloudy, descr: "partly cloudy" };
        case 3: return { icon: iconOvercast, descr: "overcast" };

        case 45: case 48: return { icon: iconFog, descr: "fog" };

        case 51: case 53: case 55: case 56:
        case 57: return { icon: iconDrizzle, descr: "drizzle" };

        case 61: case 63: case 65: case 66: case 67: case 80:
        case 81: return { icon: iconRain, descr: "rain" };

        case 71: case 73: case 75: case 77:
        case 85: return { icon: iconSnow, descr: "snow" };

        case 82: case 86: case 95: case 96:
        case 99: return { icon: iconStorm, descr: "storm" };
    }
}

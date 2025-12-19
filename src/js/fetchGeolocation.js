export function getLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            return reject(new Error("Geolocation is not supported on this browser. "))
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords
                let location = "-";
                try {
                    location = await reverseGeocoding(latitude, longitude)
                } catch (error) {
                    return resolve({
                        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                        latitude, longitude, location: "Earth"
                    })
                }
                return resolve({
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                    latitude, longitude, location
                })
            },

            (error) => reject(error),

            { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
        )
    })
}


async function reverseGeocoding(latitude, longitude) {
    const url = `/.netlify/functions/geoapify?lat=${latitude}&long=${longitude}`

    try {
        const response = await fetch(url)
        const data = await response.json()
        console.log(data)
        const { city, state, country } = data["features"][0]["properties"]
        return `${city}, ${state} ${country}`
    }
    catch (err) {
        throw err
    }
}

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
    const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}`
    try {
        const response = await fetch(url)
        const data = await response.json()
        const { city, state, country } = data["features"][0]["properties"]
        return `${city}, ${state} ${country}`
    }
    catch (err) {
        throw err
    }
}

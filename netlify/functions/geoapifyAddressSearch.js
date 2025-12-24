export async function handler(event) {
    const apiKey = process.env.GEOAPIFY_API_KEY

    if (!apiKey) {
        return {
            body: JSON.stringify({ error: "API Key not configured." }),
            statusCode: 500
        }
    }

    const { text, limit } = event.queryStringParameters || {}

    if (!text) {
        return {
            body: JSON.stringify({ error: "Missing search text." }),
            statusCode: 400
        }
    }

    const url = `https://api.geoapify.com/v1/geocode/search?text=${text}&limit=${limit}&apiKey=${apiKey}`

    try {
        const response = await fetch(url)
        const data = await response.json()
        return {
            body: JSON.stringify(data),
            statusCode: 200,
            headers: { "Content-Type": "application/json" }
        }

    } catch (error) {
        return {
            body: JSON.stringify({ error: "Internal server error." }),
            statusCode: 500
        }
    }
}
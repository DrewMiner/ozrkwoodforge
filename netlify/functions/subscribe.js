const fetch = require("node-fetch");

export async function handler(event) {
    console.log("✅ Netlify function started");

    try {
        console.log("📝 Incoming event:", event);

        if (event.httpMethod !== "POST") {
            console.log("❌ Invalid request method:", event.httpMethod);
            return {
                statusCode: 405,
                body: JSON.stringify({ error: "Method Not Allowed" })
            };
        }

        const { email } = JSON.parse(event.body);
        console.log("📩 Received email:", email);

        if (!email) {
            console.log("❌ No email provided.");
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Email is required." })
            };
        }

        const apiKey = process.env.BREVO_API_KEY;
        if (!apiKey) {
            console.error("❌ API Key is missing! Check Netlify environment variables.");
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Missing API Key in server environment" })
            };
        }

        const response = await fetch("https://api.brevo.com/v3/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": apiKey
            },
            body: JSON.stringify({
                email: email,
                listIds: [3]
            })
        });

        const data = await response.json();
        console.log("📩 Brevo API Response:", data);

        if (!response.ok) {
            console.log("❌ Brevo API Error:", data);
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: data })
            };
        }

        console.log("✅ Subscription successful!");
        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Success", data })
        };

    } catch (error) {
        console.error("❌ Subscription Error:", error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
}

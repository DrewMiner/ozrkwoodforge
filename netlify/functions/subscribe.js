const fetch = require("node-fetch");

exports.handler = async function(event) {
    // Parse the incoming request body
    const { email } = JSON.parse(event.body);

    if (!email) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Email is required" })
        };
    }

    try {
        const response = await fetch("https://api.brevo.com/v3/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": process.env.BREVO_API_KEY // ✅ Now using Netlify's stored API key
            },
            body: JSON.stringify({
                email: email,
                listIds: [YOUR_LIST_ID]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: data })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Success", data })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to subscribe" })
        };
    }
};

exports.handler = async function(event) {
    console.log("✅ Netlify function started");

    try {
        const { email } = JSON.parse(event.body);
        console.log("📩 Received email:", email);

        if (!email) {
            console.log("❌ No email provided.");
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Email is required." })
            };
        }

        const response = await fetch("https://api.brevo.com/v3/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": process.env.BREVO_API_KEY
            },
            body: JSON.stringify({
                email: email,
                listIds: [YOUR_LIST_ID]
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
};
import fetch from "node-fetch";

exports.handler = async function(event) {
    console.log("✅ Netlify function started");

    try {
        console.log("📝 Incoming request:", event);

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

        const response = await fetch("https://api.brevo.com/v3/contacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": process.env.BREVO_API_KEY
            },
            body: JSON.stringify({
                email: email,
                listIds: [YOUR_LIST_ID]
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
};


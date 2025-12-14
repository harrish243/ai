
const https = require('https');

const apiKey = "AIzaSyCqdp-yb6VMaM4DMWf6YSolprC1Zy8C-LU"; // New Key

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

console.log(`Querying: ${url}`);

https.get(url, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            if (json.models) {
                console.log("--- VALID MODELS ---");
                json.models.forEach(m => {
                    if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                        console.log(m.name.replace("models/", ""));
                    }
                });
                console.log("--------------------");
            } else {
                console.log("No 'models' property found:", json);
            }
        } catch (e) {
            console.error("Error parsing JSON:", e);
            console.log("Raw Data:", data);
        }
    });

}).on("error", (err) => {
    console.error("Error with request:", err.message);
});

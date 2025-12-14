
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function checkModels() {
    const apiKey = "AIzaSyCqdp-yb6VMaM4DMWf6YSolprC1Zy8C-LU"; // New User API Key
    const genAI = new GoogleGenerativeAI(apiKey);

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        console.log("Checking model availability...");

        // There isn't a direct "listModels" on the instance in 0.x sometimes, 
        // but looking at imports, "GoogleGenerativeAI" class usually manages getting a model.
        // The error suggests calling ListModels.
        // We can try to assume there might be a mismatch or just try a basic generation to see if it works with a different name.

        // Actually, checking standard fetch to list models might be easier without relying on SDK nuances if we don't know them perfectly.
        // But let's try the SDK first if we can finding a generic way.
        // Wait, the error message literally says "Call ListModels".
        // In strict SDK usage, it's usually not exposed on the main class in older versions, but likely is in 0.21+.

        // Let's try a direct fetch to the API endpoint to list models.
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.models) {
            console.log("AVAILABLE MODELS:");
            data.models.forEach(m => {
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`- ${m.name.replace('models/', '')}`);
                }
            });
        } else {
            console.log("ERROR LISTING MODELS:", data);
        }
    } catch (error) {
        console.error("Script Error:", error);
    }
}

checkModels();

import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import readlineSync from "readline-sync";

function getWeatherDetails(city = "") {
    if (city.toLowerCase() === "kolkata") return "20°C";
    if (city.toLowerCase() === "bangalore") return "10°C";
    return "Weather data not available for this city";
}

const tools = {
    getWeatherDetails,
};

const SYSTEM_PROMPT = `
You are an AI Assistant with START, PLAN, ACTION, Observation and Output State.
Wait for the user prompt and first PLAN using available tools.
After planning, take the action with appropriate tools and wait for observation based on action.
Once you get the observations, return the AI response based on the user prompt and observations.

Strictly follow the JSON output format as in the example.
Return exactly one JSON object per response.

Available Tools:
- getWeatherDetails(city: string): string — returns weather for a city

Example flow:
{ "type": "user", "user": "What is the sum of weather of Kolkata and Bangalore?" }
{ "type": "plan", "plan": "I will call getWeatherDetails for Kolkata" }
{ "type": "action", "function": "getWeatherDetails", "input": "Kolkata" }
{ "type": "observation", "observation": "20°C" }
{ "type": "plan", "plan": "I will call getWeatherDetails for Bangalore" }
{ "type": "action", "function": "getWeatherDetails", "input": "Bangalore" }
{ "type": "observation", "observation": "10°C" }
{ "type": "output", "output": "The sum of weather of Kolkata and Bangalore is 30°C" }
`;

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

function toGeminiMessage(role, text) {
    return {
        role: role === "model" ? "model" : "user",
        parts: [{ text }],
    };
}

while (true) {
    const query = readlineSync.question(">> ");
    const messages = [
        toGeminiMessage("user", JSON.stringify({ type: "user", user: query })),
    ];

    while (true) {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: messages,
            config: {
                systemInstruction: SYSTEM_PROMPT,
                responseMimeType: "application/json",
            },
        });

        const result = response.text.trim();
        messages.push(toGeminiMessage("model", result));

        let step;
        try {
            step = JSON.parse(result);
        } catch {
            console.log("Bot: Sorry, I could not understand the response.");
            break;
        }

        if (step.type === "output") {
            console.log(`Bot: ${step.output}`);
            break;
        }

        if (step.type === "action") {
            const fn = tools[step.function];
            const observation = fn ? fn(step.input) : `Unknown function: ${step.function}`;

            messages.push(
                toGeminiMessage(
                    "user",
                    JSON.stringify({ type: "observation", observation })
                )
            );
        }
    }
}

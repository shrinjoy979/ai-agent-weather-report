# AI Weather Agent (TypeScript + Gemini)

An AI-powered command-line weather agent built with **TypeScript** and **Google Gemini 2.5 Flash**. The agent follows the **ReAct (Reasoning + Acting)** pattern by planning, calling tools, observing the results, and generating the final response.

This project demonstrates how to build a simple AI agent that can use external tools instead of relying only on the LLM.

---

## Features

- Google Gemini 2.5 Flash integration
- ReAct-style reasoning (Plan → Action → Observation → Output)
- Tool calling architecture
- Weather lookup tool
- Interactive CLI
- Built with TypeScript
- Easily extensible with new tools

---

## Project Structure

```
.
├── src
│   └── index.ts
├── package.json
├── tsconfig.json
├── .env
└── README.md
```

---

## Tech Stack

- TypeScript
- Node.js
- Google Gemini API
- @google/genai SDK
- readline-sync
- dotenv

---

## Installation

Clone the repository

```bash
git clone https://github.com/your-username/ai-agent-weather-report.git

cd ai-agent-weather-report
```

Install dependencies

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the root directory.

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Get your API key from Google AI Studio.

---

## Running the Project

Development

```bash
npm run dev
```

Build

```bash
npm run build
```

Run compiled JavaScript

```bash
npm start
```

---

## Example

### Input

```
>> What is the weather of Kolkata?
```

### Agent Reasoning

```
User
   │
   ▼
Plan
   │
   ▼
Action
(getWeatherDetails)
   │
   ▼
Observation
(20°C)
   │
   ▼
Output
"The weather in Kolkata is 20°C"
```

---

## Supported Tool

### getWeatherDetails(city)

Returns the weather for a supported city.

Example

```ts
getWeatherDetails("Kolkata");
```

Returns

```
20°C
```

---

## ReAct Workflow

The agent follows the ReAct (Reasoning + Acting) pattern.

```
User Query
      │
      ▼
     PLAN
      │
      ▼
    ACTION
      │
      ▼
 Observation
      │
      ▼
    OUTPUT
```

Example JSON conversation

```json
{
  "type": "user",
  "user": "What is the weather of Kolkata?"
}

{
  "type": "plan",
  "plan": "I will call the weather tool."
}

{
  "type": "action",
  "function": "getWeatherDetails",
  "input": "Kolkata"
}

{
  "type": "observation",
  "observation": "20°C"
}

{
  "type": "output",
  "output": "The weather in Kolkata is 20°C."
}
```

---

## Adding New Tools

Adding a new tool is simple.

```ts
function getTime(city: string): string {
    return "10:30 AM";
}

const tools = {
    getWeatherDetails,
    getTime,
};
```

The AI can then decide when to call the new tool.

---

## Future Improvements

- Real weather API integration
- Multiple tool support
- Tool auto-discovery
- Streaming responses
- Function Calling API
- Memory support
- Conversation history
- Web Search
- File System tools
- Calculator tool
- Multi-agent architecture

---

## Learning Outcomes

This project demonstrates:

- Building AI Agents
- Tool Calling
- ReAct Pattern
- Gemini SDK
- TypeScript
- Prompt Engineering
- JSON-based Agent Communication

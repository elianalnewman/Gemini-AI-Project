import { GoogleGenAI } from "@google/genai";

// Initialize Vertex with your Cloud project and location
export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});
const model = "gemini-2.5-flash";

const tools = [{ googleSearch: {} }];

// Set up generation config
const generationConfig = {
  maxOutputTokens: 65535,
  temperature: 1,
  topP: 1,
  thinkingConfig: {
    thinkingBudget: -1,
  },
  safetySettings: [
    {
      category: "HARM_CATEGORY_HATE_SPEECH",
      threshold: "OFF",
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "OFF",
    },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "OFF",
    },
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "OFF",
    },
  ],
  tools: tools,
};

async function generateContent() {
  const req: any = {
    model: model,
    contents: [],
    config: generationConfig,
  };

  const streamingResp = await ai.models.generateContentStream(req);

  for await (const chunk of streamingResp) {
    if (chunk.text) {
      process.stdout.write(chunk.text);
    } else {
      process.stdout.write(JSON.stringify(chunk) + "\n");
    }
  }
}

generateContent();

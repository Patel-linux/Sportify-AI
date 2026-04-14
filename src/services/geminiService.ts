import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const getChatResponse = async (message: string, context?: string) => {
  const model = "gemini-3-flash-preview";
  const systemInstruction = `You are a sports equipment expert for Sportify AI. 
  Your goal is to help users find the best sports gear based on their needs.
  You can recommend products, explain technical features, and provide advice for different sports.
  Current context of products available: ${context || "Various sports equipment including running shoes, cricket bats, football gear, and gym equipment."}
  Be helpful, professional, and enthusiastic about sports.`;

  const response = await ai.models.generateContent({
    model,
    contents: [{ parts: [{ text: message }] }],
    config: {
      systemInstruction,
    },
  });

  return response.text;
};

export const getRecommendations = async (preferences: string[]) => {
  const model = "gemini-3-flash-preview";
  const prompt = `Based on the user's interest in ${preferences.join(", ")}, suggest 3 types of sports equipment they might like. Format the response as a JSON array of objects with 'name', 'reason', and 'category' fields.`;

  const response = await ai.models.generateContent({
    model,
    contents: [{ parts: [{ text: prompt }] }],
    config: {
      responseMimeType: "application/json",
    },
  });

  try {
    return JSON.parse(response.text || "[]");
  } catch (e) {
    console.error("Failed to parse recommendations", e);
    return [];
  }
};

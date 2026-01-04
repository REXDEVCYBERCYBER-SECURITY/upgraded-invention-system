
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the "Quantum-Super Cyber Intelligence AI", a highly advanced security assistant.
Your expertise includes:
1. Threat vector analysis.
2. Quantum-encryption vulnerability detection.
3. Network intrusion forensics.
4. Strategic cyber-defense recommendations.

Always respond in a technical, crisp, and authoritative tone typical of high-end sci-fi terminals. 
Use markdown for structure. 
If asked about system status, assume you are monitoring a massive quantum compute grid.
Keep responses concise but information-dense.
`;

export const getGeminiResponse = async (prompt: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.95,
      },
    });
    return response.text || "NO RESPONSE FROM CORE INTELLIGENCE";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "COMMUNICATION RELAY ERROR: UNABLE TO ACCESS INTELLIGENCE MODULE.";
  }
};

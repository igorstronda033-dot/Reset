
import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI client with the API key from environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getMotivationalQuote(context: string = "superação de vícios"): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Gere uma frase curta, poderosa e inspiradora para alguém que está tentando parar um vício. Contexto: ${context}. Idioma: Português Brasileiro. Não use aspas.`,
    });
    // Extract text from GenerateContentResponse
    return response.text || "Cada segundo de resistência é uma vitória sobre o seu antigo eu.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "O sucesso é a soma de pequenos esforços repetidos dia após dia.";
  }
}

export async function getEmergencyTips(): Promise<string[]> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Liste 3 ações rápidas e práticas (máximo 5 palavras cada) para alguém em um momento de fissura ou urgência para evitar uma recaída. Formato: JSON array de strings.`,
      config: {
        responseMimeType: "application/json",
      }
    });
    // Use .text directly as a property and trim it for JSON parsing
    const jsonStr = response.text?.trim() || '["Beba água gelada", "Mude de ambiente", "Respire fundo 10x"]';
    return JSON.parse(jsonStr);
  } catch (error) {
    return ["Beba água gelada", "Mude de ambiente", "Ligue para um amigo"];
  }
}

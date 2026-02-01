
import { GoogleGenAI, Type } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async analyzeHotelOpportunity(details: string) {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analizá rápidamente esta oportunidad de hospedaje en Bariloche: "${details}". Identificá 3 puntos donde un contenido audiovisual premium y tráfico pago directo hacia Brasil podrían eliminar la dependencia de Booking/Airbnb y aumentar el margen de ganancia. Retorná en JSON. Usá español de Argentina.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            opportunities: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            estimatedValueIncrease: { type: Type.STRING }
          }
        }
      }
    });
    return JSON.parse(response.text || '{}');
  }
}

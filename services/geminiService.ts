import { GoogleGenAI, Type, SchemaParams } from "@google/genai";
import { DivinationResult, GeminiAnalysis } from "../types";
import { SIX_REN_DETAILS } from "../constants";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema: SchemaParams = {
  type: Type.OBJECT,
  properties: {
    sentiment: {
      type: Type.STRING,
      enum: ['Bullish', 'Bearish', 'Neutral', 'Volatile'],
      description: 'Overall market sentiment direction based on the divination flow.'
    },
    probability: {
      type: Type.NUMBER,
      description: 'Probability percentage (0-100) of the predicted direction occurring.',
    },
    explanation: {
      type: Type.STRING,
      description: 'A detailed interpretation of the Month -> Day -> Hour progression and its impact on the stock market.',
    },
    advice: {
      type: Type.STRING,
      description: 'Actionable trading advice based on this specific combination.',
    }
  },
  required: ['sentiment', 'probability', 'explanation', 'advice']
};

export const getGeminiAnalysis = async (divination: DivinationResult): Promise<GeminiAnalysis> => {
  const modelId = "gemini-2.5-flash";
  
  const monthDetail = SIX_REN_DETAILS[divination.monthRen];
  const dayDetail = SIX_REN_DETAILS[divination.dayRen];
  const timeDetail = SIX_REN_DETAILS[divination.timeRen];

  const prompt = `
    You are an expert Stock Market Oracle using the "Xiao Liu Ren" (Small Six Ren) method combined with technical market psychology.
    
    The user wants to know if the market will GO UP (Bullish) or GO DOWN (Bearish) at this specific time: ${divination.date.toLocaleString()}.
    
    DIVINATION ANALYSIS (3-Step Method):
    
    1. ROOT (Month) - Macro Context:
       State: ${divination.monthRen} (${monthDetail.cn})
       Meaning: ${monthDetail.meaning}
       Implication: ${monthDetail.stockImplication}
       
    2. TRUNK (Day) - Recent Trend / Process:
       State: ${divination.dayRen} (${dayDetail.cn})
       Meaning: ${dayDetail.meaning}
       Implication: ${dayDetail.stockImplication}
       
    3. LEAF (Hour) - Final Outcome / Current Moment:
       State: ${divination.timeRen} (${timeDetail.cn})
       Meaning: ${timeDetail.meaning}
       Implication: ${timeDetail.stockImplication}
       
    Combined Interpretation Rules:
    - Analyze the FLOW. For example, moving from 'Liu Lian' (Delay) in Day to 'Su Xi' (Quick Joy) in Hour is a strong breakout signal.
    - Moving from 'Da An' (Stable) to 'Kong Wang' (Void) suggests a sudden crash or loss of liquidity.
    - The 'Hour' (Final Result) is the most important for the immediate price action, but 'Day' provides the volatility context.
    
    Task:
    Provide a prediction for the stock market direction.
    - If the progression is positive (e.g. into Su Xi, Da An, Xiao Ji), high probability of rise.
    - If the progression is negative (e.g. into Kong Wang, Chi Kou), high probability of fall.
    - Be decisive about the "Probability".
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.7 
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from Oracle.");

    return JSON.parse(text) as GeminiAnalysis;

  } catch (error) {
    console.error("Gemini Oracle Error:", error);
    // Fallback if API fails
    return {
      sentiment: 'Neutral',
      probability: 50,
      explanation: "The connection to the digital ether is unstable. (API Error)",
      advice: "Exercise caution."
    };
  }
};
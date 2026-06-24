import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

const MODEL = "openrouter/auto";

export async function testGemini() {
  try {
    const response = await client.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "user",
          content: "Reply only with: EATSAFE AI WORKING",
        },
      ],
    });

    return response.choices[0].message.content || "No response";
  } catch (error) {
    console.log("AI ERROR:", error);
    return "Unable to generate insight.";
  }
}

export async function generateNutritionInsight(
  calories: string,
  sugar: string,
  fat: string,
  protein: string,
  salt: string
) {
  try {
    const prompt = `
You are a nutrition expert.

Analyze this food product per 100g:

Calories: ${calories}
Sugar: ${sugar}
Fat: ${fat}
Protein: ${protein}
Salt: ${salt}

Important:
- If any value is N/A, unavailable, empty, or unknown, do NOT assume it is zero.
- Mention that the information is unavailable.
- Only analyze the nutrition values that are available.

Give a short 2-3 sentence health insight.
Keep it simple and easy for everyday users.
Do not use bullet points.
`;

    console.log("GENERATING INSIGHT...");

    const response = await client.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    console.log("INSIGHT GENERATED");

    return response.choices[0].message.content || "Unable to generate insight.";
  } catch (error) {
    console.log("AI ERROR:", error);
    return "Unable to generate insight.";
  }
}
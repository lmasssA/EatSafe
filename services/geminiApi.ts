import OpenAI from "openai";
import { getHealthProfile } from "@/utils/healthStorage";

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
  const profile = await getHealthProfile();

  const prompt = `
You are an experienced clinical nutritionist.

Analyze this packaged food product per 100g.

Nutrition Information:
Calories: ${calories}
Sugar: ${sugar}
Fat: ${fat}
Protein: ${protein}
Salt: ${salt}

User Health Profile:
Health Conditions:
${
profile.conditions.length
  ? profile.conditions.join(", ")
  : "None"
}

Dietary Preferences:
${
profile.dietaryPreferences.length
  ? profile.dietaryPreferences.join(", ")
  : "None"
}

Health Goal:
${profile.healthGoal || "None"}

Rules:

1. If a nutrition value is unavailable (N/A, missing, or unknown), NEVER describe it as low, high, absent, zero, or lacking.

2.Only discuss nutrients whose values are explicitly available.

If protein or fat are unavailable, do not mention them in your recommendation.

Never invent nutrition facts.
3. Base conclusions ONLY on the available nutrition values.
4. Personalize the advice according to the user's health conditions, dietary preferences and health goal.
5. Keep the language simple.
6. Avoid medical jargon.
7. Keep every section short.
8. Do NOT use markdown (** or ##).
9. Do NOT use bullet points.
10. Return exactly the following format:

Main Concern:
(One short sentence.)

Health Goal:
(One short sentence related to the user's selected goal.)

Recommendation:
(One practical recommendation.)

Overall Verdict:
Choose ONLY ONE of:
Excellent Choice
Good Choice
Acceptable Occasionally
Limit Consumption
Not Recommended
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
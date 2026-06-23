import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.EXPO_PUBLIC_GEMINI_API_KEY!
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export async function testGemini() {
  try {
    const result =
     await model.generateContent(
  "Reply only with: EATSAFE GEMINI WORKING"
);
    return result.response.text();
  } catch (error) {
    console.log(
      "GEMINI INSIGHT ERROR:"
    );
console.log(error);
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

Calories: ${calories} kcal
Sugar: ${sugar} g
Fat: ${fat} g
Protein: ${protein} g
Salt: ${salt} g

Give a short 2-3 sentence health insight.
Keep it simple and easy for everyday users.
Do not use bullet points.
`;

console.log(
  "GENERATING INSIGHT..."
);
    const result =
      await model.generateContent(prompt);
      console.log(
  "INSIGHT GENERATED"
);

    return result.response.text();
  } catch (error) {
    console.log(
      "GEMINI INSIGHT ERROR:",
      error
    );

    return "Unable to generate insight.";
  }
}
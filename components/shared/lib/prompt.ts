import { z } from "zod";

import { formSchema } from "../../features/create-meal-plan-form/create-meal-plan-form";

const formats = {
  daily: `
    {
      "meals": [{"title": "string", "calories": "string", "ingredients": ["string"]}],
      "totalCalories": "string",
      "totalProtein": "string",
      "mealPlanTitle": "string",
    }
  `,
  weekly: `
    {
      "days": [
        { 
          "meals": [{"title": "string", "calories": "string", "ingredients": ["string"]}],
          "totalCalories": "string",
          "mealPlanTitle": "string",
          "totalProtein": "string",
        }
      ],
      "weeklyMealPlanTitle": "string",
      "totalCalories": "string",
    }
  `,
};

export const getPrompt = (
  values: z.infer<typeof formSchema>,
  type: "daily" | "weekly"
) => {
  let prompt = `
    Create a customized meal plan for the entire ${type} based on the following details:

    - Age: ${values.age}
    - Gender: ${values.gender}
    - Number of meals per day: ${values.meals}
    - Diet type: ${values.diet} (e.g., vegetarian, keto, low-carb)
    - Primary goal: ${values.goal} (e.g., weight loss, muscle gain, maintenance)
   
  `;

  if (values.weight) {
    prompt += `
      - Weight: ${values.weight} ${values.weightUnit}
    `;
  }

  if (values.height) {
    prompt += `
      - Height: ${values.height} ${values.heightUnit}
    `;
  }

  if (values.allergies) {
    prompt += `
      - Allergies and dislikes: ${values.allergies}
    `;
  }

  const jsonFormat = `
    Keep the result in one line, nothing should break the JSON formatting.

    Ensure that the meal plan aligns with my nutritional needs and goals, 
    offering a balanced and varied diet. Provide detailed meal ideas with portion sizes, 
    ingredient suggestions, and nutritional information. 
    Ingredients should have amounts in grams and protein in grams like this: Chicken Breasts (200g, Protein: 62g).
    mealPlanTitle should be something logical, connected to the diet type, and goal, etc.
    Meal title should be connected to food ingredients inside that specific meal.

    Return the result as a single line of valid JSON in this format:
    ${formats[type]}
  `;

  return `${prompt} ${jsonFormat}`;
};

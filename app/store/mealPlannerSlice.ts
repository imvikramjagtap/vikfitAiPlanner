import { DailyMealPlan, Meal } from '@/components/shared/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface MealPlannerState {
  dailyMealPlans: DailyMealPlan[];
}

const initialState: MealPlannerState = {
  dailyMealPlans: [],
};

const mealPlannerSlice = createSlice({
  name: 'mealPlanner',
  initialState,
  reducers: {
    addDailyMealPlan: (state, action: PayloadAction<Omit<DailyMealPlan, 'id' | 'createdAt'>>) => {
      const newDailyPlan: DailyMealPlan = {
        ...action.payload,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      };
      state.dailyMealPlans.push(newDailyPlan);
    },
    deleteDailyMealPlan: (state, action: PayloadAction<string>) => {
      state.dailyMealPlans = state.dailyMealPlans.filter(
        plan => plan.id !== action.payload
      );
    },
    addMeal: (state, action: PayloadAction<{ dailyPlanId: string; meal: Meal }>) => {
      const dailyPlan = state.dailyMealPlans.find(plan => plan.id === action.payload.dailyPlanId);
      if (dailyPlan) {
        dailyPlan.meals.push(action.payload.meal);
        dailyPlan.totalCalories = dailyPlan.meals.reduce(
          (total, meal) => total + parseInt(meal.calories), 0
        ).toString();
      }
    },
    deleteMeal: (state, action: PayloadAction<{ dailyPlanId: string; mealTitle: string }>) => {
      const dailyPlan = state.dailyMealPlans.find(plan => plan.id === action.payload.dailyPlanId);
      if (dailyPlan) {
        dailyPlan.meals = dailyPlan.meals.filter(meal => meal.title !== action.payload.mealTitle);
        dailyPlan.totalCalories = dailyPlan.meals.reduce(
          (total, meal) => total + parseInt(meal.calories), 0
        ).toString();
      }
    },
  },
});

export const { addDailyMealPlan, deleteDailyMealPlan, addMeal, deleteMeal } = mealPlannerSlice.actions;
export default mealPlannerSlice.reducer;
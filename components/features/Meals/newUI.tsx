import React from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { format } from "date-fns";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui";
import { Badge } from "@/components/ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MealDetails } from "./MealDetails";
import { DailyMealPlan, Meal } from "@/components/shared/types";

export default function MealPlanCards() {
  const dailyMealPlans = useSelector(
    (state: RootState) => state.mealPlanner.dailyMealPlans
  );

  // Sort the meal plans by creation date, latest first
  const sortedMealPlans = [...dailyMealPlans].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const latestPlan = sortedMealPlans[0];
  const pastPlans = sortedMealPlans.slice(1);

  const MealPlanCard = ({
    plan,
    isLatest = false,
  }: {
    plan: DailyMealPlan;
    isLatest?: boolean;
  }) => (
    <Card className={`overflow-hidden ${isLatest ? "mb-8" : ""}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{plan.mealPlanTitle}</CardTitle>
          {isLatest ? (
            <Badge variant="secondary" className="bg-green-500 text-white">
              Latest
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-orange-400 text-white">
              Past Plans
            </Badge>
          )}
        </div>
        <CardDescription>
          Created on {format(new Date(plan.createdAt), "PPP")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex gap-2">
          <Badge variant="secondary">
            Total Calories: {plan.totalCalories}
          </Badge>
          <Badge variant="secondary">Total Protein: {plan.totalProtein}</Badge>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {plan.meals.map((meal: Meal, mealIndex: number) => (
            <AccordionItem key={mealIndex} value={`meal-${mealIndex}`}>
              <AccordionTrigger>{meal.title}</AccordionTrigger>
              <AccordionContent>
                <MealDetails
                  title={meal.title}
                  calories={meal.calories}
                  ingredients={meal.ingredients}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latestPlan && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MealPlanCard plan={latestPlan} isLatest={true} />
          </motion.div>
        )}
        {pastPlans.length > 0 && (
          <>
            {pastPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <MealPlanCard plan={plan} />
              </motion.div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui";

interface Ingredient {
  name: string;
  amount: string;
  protein: string;
}

interface MealDetailsProps {
  title: string;
  calories: string;
  ingredients: string[];
}

export function MealDetails({
  title,
  calories,
  ingredients,
}: MealDetailsProps) {
  return (
    <div className="bg-card rounded-lg p-4 shadow-md">
      <div className="flex md:items-center mb-3 gap-2 flex-col md:flex-row">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Badge  variant="secondary" className="mr-2">
          {calories} calories
        </Badge>
      </div>
      <div className="space-y-2">
        {ingredients.map((ingredient, index) => {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex justify-between items-center bg-muted p-2 rounded"
            >
              {ingredient}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

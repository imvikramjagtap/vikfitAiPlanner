"use client"

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { Button } from "@/components/ui";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import Link from 'next/link';
import { Progress } from "@/components/ui/progress/progress";
export const maxPlans = 2;

export function MealPlanLimitations() {
  const dailyMealPlans = useSelector((state: RootState) => state.mealPlanner.dailyMealPlans);
  const planCount = dailyMealPlans.length;

  return (
    <Card className="w-full max-w-md mx-auto mt-8 bg-card">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Meal Plan Capacity</CardTitle>
        <CardDescription>
          You can create up to two personalized diet plans.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={(planCount / maxPlans) * 100} className="w-full" />
          <p className="text-sm text-muted-foreground">
            {planCount} of {maxPlans} plans created
          </p>
          <div className="flex items-center space-x-2">
            {planCount < maxPlans ? (
              <AlertCircle className="h-5 w-5 text-yellow-500" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            )}
            <span className="text-sm font-medium">
              {planCount < maxPlans
                ? `You can create ${maxPlans - planCount} more plan${maxPlans - planCount > 1 ? 's' : ''}.`
                : "You've reached the maximum number of plans."}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {planCount < maxPlans && (
          <Button asChild>
            <Link href="/create-meal-plan">Create New Plan</Link>
          </Button>
        )}
        {planCount > 0 && (
          <Button asChild variant={planCount < maxPlans ? "outline" : "default"}>
            <Link href="/meal-plans">View My Plans</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
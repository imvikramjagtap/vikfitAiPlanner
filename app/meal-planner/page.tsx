import { MealPlanLimitations } from "@/components/features/MealPlanCapacity/planCapacity";

export default function MealPlannerPage() {
  return (
    <>
      <div className="flex flex-col gap-2  p-10 py-24">
        <MealPlanLimitations />
      </div>
    </>
  );
}

"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { trpc } from "@/server/client";
import { Goal, Diet } from ".";

import { CompletionModel } from "@/components/shared/types";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  RadioGroup,
  RadioGroupItem,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
  Textarea,
} from "@/components/ui";
import { getPrompt } from "@/components/shared/lib";
import { addDailyMealPlan } from "@/app/store/mealPlannerSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { maxPlans } from "../MealPlanCapacity/planCapacity";

const goals = Object.values(Goal);
const diets = Object.values(Diet);

export const formSchema = z.object({
  age: z.coerce.number().min(1).max(100),
  goal: z.nativeEnum(Goal),
  meals: z.coerce.number().min(2).max(12),
  gender: z.enum(["male", "female"]),
  diet: z.nativeEnum(Diet),
  weight: z.coerce.number().min(1).max(400).optional(),
  height: z.coerce.number().min(1).max(400).optional(),
  weightUnit: z.enum(["kg", "lb"]),
  heightUnit: z.enum(["cm", "in"]),
  allergies: z.string(),
});

export default function CreateMealPlanForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const getCompletion = trpc.ai.completion.useMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 18,
      goal: Goal.HEALTHY,
      meals: 2,
      gender: "male",
      diet: Diet.ANY,
      weightUnit: "kg",
      heightUnit: "cm",
      allergies: "",
    },
  });

  const dailyMealPlans = useSelector(
    (state: RootState) => state.mealPlanner.dailyMealPlans
  );

  console.log(maxPlans, "maxPlans");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const prompt = getPrompt(values, "daily");
    try {
      const completion = await getCompletion.mutateAsync({
        prompt: `${prompt}`,
        model: CompletionModel.GPT_3_5_TURBO,
      });
      dispatch(addDailyMealPlan(JSON.parse(completion)));
      router.push(`/meal-plans`);
    } catch (e) {
      console.error("Error fetching AI completion:", e);
      throw e;
    }
  }
  console.log(
    dailyMealPlans.length < maxPlans || dailyMealPlans.length === 0,
    "dailyMealPlans.length > maxPlans || dailyMealPlans.length === 0"
  );
  console.log(
    dailyMealPlans.length > maxPlans,
    "dailyMealPlans.length > maxPlans"
  );
  const planCount = dailyMealPlans.length;
  return (
    <main className="flex flex-col items-center justify-center gap-5 p-10 py-24">
      {getCompletion.isPending && (
        <div className="grid gap-5 md:grid-cols-2">
          <Skeleton className="h-52 w-96 rounded-xl" />
          <Skeleton className="h-52 w-96 rounded-xl" />
          <Skeleton className="h-52 w-96 rounded-xl" />
          <Skeleton className="h-52 w-96 rounded-xl" />
        </div>
      )}

      {!getCompletion.isPending && (
        <div className="flex flex-col items-center justify-center gap-5">
          <p className="sm:w-1/2 sm:text-center">
            Please take a moment to fill out this form so we can tailor your
            experience and provide you with the most personalized and effective
            results possible. Let&apos;s get started on your journey to BE
            HEALTHY!
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid w-full gap-5 md:w-1/2 md:grid-cols-2"
            >
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Age" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="meals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of meals</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Number of meals"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Your gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Goal</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Your Goal" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {goals.map((goal) => (
                            <SelectItem key={goal} value={goal}>
                              {goal}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="diet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diet</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Your Diet" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {diets.map((diet) => (
                            <SelectItem key={diet} value={diet}>
                              {diet}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-full flex w-full justify-center">
                <FormField
                  control={form.control}
                  name="allergies"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Allergies</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Some allergies or food that you don't like"
                          {...field}
                          rows={5}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="weightUnit"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-2"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="kg" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Kilograms (kg)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="lb" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Pounds (lb)
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="heightUnit"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-2"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="cm" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Centimeters (cm)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="in" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Inches (in)
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Weight" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Height" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="col-span-full flex w-full justify-center">
                {dailyMealPlans.length < maxPlans ||
                  (dailyMealPlans.length === maxPlans && (
                    <div className="flex flex-col items-center gap-2">
                      <p className="flex gap-1 text-sm"><AlertCircle className="size-5 text-yellow-500" />You&lsquo;ve reached the maximum number of plans.</p>
                      <Link href={"/meal-plans"}>
                        <Button type="button">
                          Go To My Plans<ArrowRight className="ml-2" />
                        </Button>
                      </Link>
                    </div>
                  ))}{" "}
                {planCount < maxPlans && (
                  <Button type="submit">Get your meal plan!</Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      )}
    </main>
  );
}

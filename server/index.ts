import { router } from "./trpc";

import { aiRouter } from "./routers/ai";


export const appRouter = router({
  ai: aiRouter,
});

export type AppRouter = typeof appRouter;

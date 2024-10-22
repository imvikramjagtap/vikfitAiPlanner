"use client";

import Link from "next/link";

import {
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { dark } from "@clerk/themes";

import { trpc } from "@/server/client";
import { Badge, Button, Skeleton } from "@/components/ui";
import { Loader2 } from "lucide-react";

export default function UserInfo() {
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <SignedOut>
        <Button variant={"outline"} asChild>
          <SignInButton />
        </Button>
      </SignedOut>

      <SignedIn>
        <ClerkLoading>
          <Skeleton className="size-8 rounded-full" />
        </ClerkLoading>
        <UserButton
          appearance={{
            baseTheme: resolvedTheme === "dark" ? dark : undefined,
          }}
        />
      </SignedIn>
    </div>
  );
}

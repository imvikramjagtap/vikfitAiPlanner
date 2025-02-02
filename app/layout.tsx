import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer, Header } from "@/components/ui";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

import { TRPCProvider, ThemeProvider, ReduxProvider } from "@/components/providers";
import { Toaster } from "@/components/ui";

export const metadata: Metadata = {
  title: "VikFit Meal Planner",
  description:
    "Your personal chef & nutritionist. Transform your eating habits.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html suppressHydrationWarning lang="en">
        <body className={`${inter.className}`}>
          <TRPCProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <ReduxProvider>
                <Header />
                {children}
                <Footer />
              </ReduxProvider>
              <Toaster />
            </ThemeProvider>
          </TRPCProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
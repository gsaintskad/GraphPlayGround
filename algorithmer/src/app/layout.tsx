// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Assuming you have this for global styles
import { Providers } from "./providers"; // The Redux provider we created
import { ThemeProvider } from "@/components/shadcnUI/ThemeProvider";
import NavigationBar from "@/components/NavigationBar/NavigationBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Graph Playground",
  description: "A playground for graph algorithms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col h-screen">
              <NavigationBar />
              <main className="flex-grow container mx-auto p-4">
                {children}
              </main>
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

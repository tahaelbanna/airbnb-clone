import type { Metadata } from "next";
import { QueryProvider } from "@/lib/query-provider";
import { AuthProvider } from "@/features/auth/auth-provider";

import "@fontsource/newsreader/400.css";
import "@fontsource/newsreader/600.css";
import "@fontsource/outfit/400.css";
import "@fontsource/outfit/500.css";
import "@fontsource/outfit/600.css";

import "./globals.css";

export const metadata: Metadata = {
  title: "ESQOUN — Find Your Perfect Stay",
  description:
    "Discover unique homes and experiences around the world. Book with confidence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

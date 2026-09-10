import { GuestRoute } from "@/components/auth/guest-route";
import Link from "next/link";
import { Compass } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GuestRoute>
      <div className="flex min-h-screen flex-col bg-zinc-50">
        <header className="flex h-16 shrink-0 items-center px-4 sm:px-6 lg:px-8 bg-background border-b border-border">
          <Link href="/" className="flex items-center gap-2">
            <Compass className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight text-primary">
              StayScape
            </span>
          </Link>
        </header>
        <main className="flex flex-1 items-center justify-center p-4 sm:p-8">
          {children}
        </main>
      </div>
    </GuestRoute>
  );
}

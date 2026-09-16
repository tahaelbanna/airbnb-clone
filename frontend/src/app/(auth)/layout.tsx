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
      <div className="flex min-h-screen flex-col bg-background">
        <header className="flex h-20 shrink-0 items-center px-6 sm:px-10 bg-background border-b border-border/40">
          <Link href="/" className="flex items-center">
            <span className="font-serif text-[1.65rem] font-semibold tracking-tight text-primary">
              ESQOUN
            </span>
          </Link>
        </header>
        <main className="flex flex-1 items-center justify-center p-6 sm:p-12">
          {children}
        </main>
      </div>
    </GuestRoute>
  );
}

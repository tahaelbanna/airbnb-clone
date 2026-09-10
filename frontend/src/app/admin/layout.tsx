"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { 
  LayoutDashboard, 
  Map, 
  MapPin, 
  DollarSign, 
  Tags, 
  Settings, 
  CalendarCheck,
  Menu,
  X,
  LogOut,
  Home
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { clearTokens } from "@/lib/api/token-storage";
import { useRouter } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Bookings", href: "/admin/bookings", icon: CalendarCheck },
  { name: "Countries", href: "/admin/countries", icon: Map },
  { name: "Cities", href: "/admin/cities", icon: MapPin },
  { name: "Currencies", href: "/admin/currencies", icon: DollarSign },
  { name: "Categories", href: "/admin/categories", icon: Tags },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const reset = useAuthStore((s) => s.reset);
  const router = useRouter();

  const handleLogout = () => {
    clearTokens();
    reset();
    router.push("/login");
  };

  return (
    <ProtectedRoute requireAdmin>
      <div className="flex h-screen bg-zinc-50 overflow-hidden">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-zinc-900/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-zinc-200 transform transition-transform duration-200 ease-in-out flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          "lg:static lg:inset-0"
        )}>
          <div className="h-16 flex items-center px-6 border-b border-zinc-200 justify-between">
            <Link href="/admin" className="font-bold text-xl text-primary">Admin Panel</Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-zinc-500 hover:text-zinc-700">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-zinc-200 space-y-2">
            <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-600 hover:bg-zinc-100 transition-colors">
              <Home className="h-5 w-5" />
              Return to Site
            </Link>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Mobile header */}
          <div className="lg:hidden h-16 bg-white border-b border-zinc-200 flex items-center px-4 justify-between shrink-0">
            <Link href="/admin" className="font-bold text-lg text-primary">Admin Panel</Link>
            <button onClick={() => setSidebarOpen(true)} className="p-2 -mr-2 text-zinc-500 hover:text-zinc-700">
              <Menu className="h-6 w-6" />
            </button>
          </div>

          <main className="flex-1 overflow-y-auto bg-zinc-50">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

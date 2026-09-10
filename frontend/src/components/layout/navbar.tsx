"use client";

import Link from "next/link";
import { Compass, Menu, User } from "lucide-react";
import { useAuthStore, selectIsAuthenticated, selectIsAdmin } from "@/store/auth-store";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";

export function Navbar() {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const isAdmin = useAuthStore(selectIsAdmin);
  const { logout } = useAuth();
  const user = useAuthStore((s) => s.user);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Compass className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight text-primary">
            StayScape
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                  Log in
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="primary" size="sm">
                  Sign up
                </Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {isAdmin && (
                <Link href="/admin" className="text-sm font-medium text-muted hover:text-foreground">
                  Admin Dashboard
                </Link>
              )}
              <div className="relative" ref={menuRef}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2 rounded-full px-4"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <Menu className="h-4 w-4" />
                  <User className="h-5 w-5" />
                </Button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 flex w-48 flex-col rounded-xl border border-border bg-background p-2 shadow-lg">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-foreground">{user?.name}</p>
                      <p className="text-xs text-muted truncate">{user?.email}</p>
                    </div>
                    <hr className="my-1 border-border" />
                    <Link href="/trips" className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-zinc-100" onClick={() => setIsMenuOpen(false)}>
                      My Trips
                    </Link>
                    <Link href="/favourites" className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-zinc-100" onClick={() => setIsMenuOpen(false)}>
                      Wishlist
                    </Link>
                    <hr className="my-1 border-border" />
                    <Link href="/listings" className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-zinc-100" onClick={() => setIsMenuOpen(false)}>
                      Manage Listings
                    </Link>
                    <Link href="/host/bookings" className="block rounded-md px-3 py-2 text-sm text-foreground hover:bg-zinc-100" onClick={() => setIsMenuOpen(false)}>
                      Reservations
                    </Link>
                    <hr className="my-1 border-border" />
                    <button 
                      onClick={() => {
                        setIsMenuOpen(false);
                        logout();
                      }}
                      className="block w-full rounded-md px-3 py-2 text-left text-sm text-foreground hover:bg-zinc-100"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

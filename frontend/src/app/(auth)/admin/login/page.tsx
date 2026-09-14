"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useAuth } from "@/hooks/use-auth";
import { loginSchema, type LoginFormData } from "@/lib/schemas/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const { adminLogin } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setServerError(null);
      await adminLogin(data);
      
      // useAuth redirect handles pushing to /admin for admin routes,
      // but if we were redirected here, we could go back to the redirect param.
      // For simplicity, GuestRoute will redirect to / immediately after login state updates.
    } catch (error) {
      if (error instanceof AxiosError) {
        // Backend returns error message in response.data.message
        const message = error.response?.data?.errors?.[0]?.message || error.response?.data?.message;
        setServerError(Array.isArray(message) ? message[0] : message || "Login failed. Please try again.");
      } else {
        setServerError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-background p-8 shadow-xl ring-1 ring-border sm:p-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Admin Login
        </h1>
        <p className="mt-2 text-sm text-muted">
          Enter your admin credentials to continue.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        {serverError && (
          <div className="rounded-xl bg-error/10 p-4 text-sm text-error">
            {serverError}
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              error={!!errors.email}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-xs text-error">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forget-password"
                className="text-xs font-semibold text-primary hover:text-primary-hover"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                error={!!errors.password}
                {...register("password")}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-error">{errors.password.message}</p>
            )}
          </div>


        </div>

        <Button type="submit" className="w-full" isLoading={isSubmitting}>
          Admin Login
        </Button>
      </form>
    </div>
  );
}

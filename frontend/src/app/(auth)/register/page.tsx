"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useAuth } from "@/hooks/use-auth";
import { registerSchema, type RegisterFormData } from "@/lib/schemas/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendOtp, verifyOtp } from "@/features/auth/api";

export default function RegisterPage() {
  const { register: authRegister } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // OTP Flow State
  const [otpMode, setOtpMode] = useState(false);
  const [registerData, setRegisterData] = useState<RegisterFormData | null>(null);
  const [otpCode, setOtpCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  useEffect(() => {
    if (resendCountdown <= 0) return;
    const timer = setInterval(() => {
      setResendCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCountdown]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmitForm = async (data: RegisterFormData) => {
    try {
      setServerError(null);
      await sendOtp({ email: data.email });
      setRegisterData(data);
      setOtpMode(true);
      setResendCountdown(60);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.errors?.[0]?.message || error.response?.data?.message;
        setServerError(Array.isArray(message) ? message[0] : message || "Failed to send verification code. Please try again.");
      } else {
        setServerError("An unexpected error occurred.");
      }
    }
  };

  const onVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerData) return;

    try {
      setIsVerifying(true);
      setServerError(null);
      // Verify OTP
      await verifyOtp({ email: registerData.email, code: otpCode });

      // Proceed with actual registration
      await authRegister(registerData);
      // GuestRoute will redirect to / immediately after login state updates.
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.errors?.[0]?.message || error.response?.data?.message;
        setServerError(Array.isArray(message) ? message[0] : message || "Verification or registration failed. Please try again.");
      } else {
        setServerError("An unexpected error occurred.");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const onResendOtp = async () => {
    if (!registerData || resendCountdown > 0) return;
    try {
      setServerError(null);
      await sendOtp({ email: registerData.email });
      setResendCountdown(60);
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.errors?.[0]?.message || error.response?.data?.message;
        setServerError(Array.isArray(message) ? message[0] : message || "Failed to resend code.");
      }
    }
  };

  if (otpMode) {
    return (
      <div className="w-full max-w-lg rounded-[2rem] bg-surface p-8 shadow-sm border border-border/50 sm:p-12">
        <div className="text-center">
          <h1 className="text-4xl font-serif tracking-tight text-foreground">
            Verify your email
          </h1>
          <p className="mt-3 text-base text-muted font-light">
            We sent a verification code to <span className="font-medium text-foreground">{registerData?.email}</span>.
          </p>
        </div>

        <form onSubmit={onVerifyOtp} className="mt-8 space-y-6">
          {serverError && (
            <div className="rounded-xl bg-error/10 p-4 text-sm text-error">
              {serverError}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="otp">Verification Code</Label>
            <Input
              id="otp"
              type="text"
              placeholder="Enter code"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full h-12 text-lg rounded-full shadow-md shadow-primary/20" isLoading={isVerifying}>
            Verify and complete registration
          </Button>
        </form>

        <div className="mt-6 flex flex-col items-center gap-2 text-sm">
          <button
            type="button"
            onClick={onResendOtp}
            disabled={resendCountdown > 0}
            className={`font-semibold ${resendCountdown > 0
              ? "text-muted-foreground cursor-not-allowed opacity-70"
              : "text-primary hover:text-primary-hover"
              }`}
          >
            {resendCountdown > 0 ? `Resend code in ${resendCountdown}s` : "Resend code"}
          </button>
          <button
            type="button"
            onClick={() => {
              setOtpMode(false);
              setServerError(null);
            }}
            className="text-muted hover:text-foreground"
          >
            Back to registration
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg rounded-[2rem] bg-surface p-8 shadow-sm border border-border/50 sm:p-12">
      <div className="text-center">
        <h1 className="text-4xl font-serif tracking-tight text-foreground">
          Create an account
        </h1>
        <p className="mt-3 text-base text-muted font-light">
          Join ESQOUN to book or host amazing places.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmitForm)} className="mt-8 space-y-6">
        {serverError && (
          <div className="rounded-xl bg-error/10 p-4 text-sm text-error">
            {serverError}
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              error={!!errors.name}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-error">{errors.name.message}</p>
            )}
          </div>

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
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1234567890"
              autoComplete="tel"
              error={!!errors.phone}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-xs text-error">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
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

        <Button type="submit" className="w-full h-12 text-lg rounded-full shadow-md shadow-primary/20" isLoading={isSubmitting}>
          Sign up
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-primary hover:text-primary-hover"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}

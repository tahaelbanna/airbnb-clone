"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendForgetPasswordOtp, verifyForgetPasswordOtp, resetPassword } from "@/features/auth/api";
import { Eye, EyeOff } from "lucide-react";

export default function ForgetPasswordPage() {
  const router = useRouter();
  
  const [step, setStep] = useState<"send-otp" | "verify-otp" | "reset-password">("send-otp");
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setIsSubmitting(true);
      setServerError(null);
      await sendForgetPasswordOtp({ email });
      setStep("verify-otp");
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message;
        setServerError(Array.isArray(message) ? message[0] : message || "Failed to send reset code.");
      } else {
        setServerError("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode) return;

    try {
      setIsSubmitting(true);
      setServerError(null);
      await verifyForgetPasswordOtp({ email, code: otpCode });
      setStep("reset-password");
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message;
        setServerError(Array.isArray(message) ? message[0] : message || "Invalid verification code.");
      } else {
        setServerError("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) return;

    try {
      setIsSubmitting(true);
      setServerError(null);
      await resetPassword({ email, newPassword });
      alert("Password has been successfully reset. You can now log in.");
      router.push("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message;
        setServerError(Array.isArray(message) ? message[0] : message || "Failed to reset password.");
      } else {
        setServerError("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-background p-8 shadow-xl ring-1 ring-border sm:p-10">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {step === "send-otp" && "Forgot Password?"}
          {step === "verify-otp" && "Verify Your Email"}
          {step === "reset-password" && "Create New Password"}
        </h1>
        <p className="mt-2 text-sm text-muted">
          {step === "send-otp" && "Enter your email address to receive a verification code."}
          {step === "verify-otp" && `We sent a verification code to ${email}.`}
          {step === "reset-password" && "Enter a new secure password for your account."}
        </p>
      </div>

      <div className="mt-8 space-y-6">
        {serverError && (
          <div className="rounded-xl bg-error/10 p-4 text-sm text-error">
            {serverError}
          </div>
        )}

        {step === "send-otp" && (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" isLoading={isSubmitting}>
              Send verification code
            </Button>
          </form>
        )}

        {step === "verify-otp" && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="otpCode">Verification Code</Label>
              <Input
                id="otpCode"
                type="text"
                placeholder="Enter 6-digit code"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" isLoading={isSubmitting}>
              Verify Code
            </Button>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => setStep("send-otp")}
                className="text-sm text-muted hover:text-foreground"
              >
                Change email address
              </button>
            </div>
          </form>
        )}

        {step === "reset-password" && (
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="pr-10"
                  required
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
            </div>
            <Button type="submit" className="w-full" isLoading={isSubmitting}>
              Reset Password
            </Button>
          </form>
        )}
      </div>

      <p className="mt-6 text-center text-sm text-muted">
        Remember your password?{" "}
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

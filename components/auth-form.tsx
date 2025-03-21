"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { publicApi } from "@/services";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AuthForm({
  variant = "login",
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  variant?: "login" | "signup";
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const email = e.target.email.value;
    const password = e.target.password.value;

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    if (variant === "login") {
      try {
        await publicApi.login(formData).then(() => {
          router.push("/dashboard");
        });
      } catch (error) {
        console.error("Login error:", error);
        setError(
          "Failed to login. Please check your credentials and try again."
        );
        setIsLoading(false);
      }
    } else {
      try {
        await publicApi.register(formData).then(async () => {
          await publicApi.login(formData).then(() => {
            router.push("/dashboard");
          });
        });
      } catch (error) {
        console.error("Register error:", error);
        setError("Failed to create account. Please try again later.");
        setIsLoading(false);
      }
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {variant === "login" ? "Login" : "Sign Up"}
          </CardTitle>
          <CardDescription>
            {variant === "login"
              ? "Enter your email below to login to your account"
              : "Enter your email and password below to create an account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {error && (
                <div className="p-3 text-sm text-white bg-red-500 rounded-md">
                  {error}
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {variant === "login" ? "Logging in..." : "Signing up..."}
                  </span>
                ) : variant === "login" ? (
                  "Login"
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {variant === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <Link
                href={variant === "login" ? "/sign-up" : "/"}
                className="underline underline-offset-4"
              >
                {variant === "login" ? "Sign up" : "Login"}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

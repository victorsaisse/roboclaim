"use client";

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleSubmit(e: any) {
    e.preventDefault();

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
              <Button type="submit" className="w-full">
                {variant === "login" ? "Login" : "Sign Up"}
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

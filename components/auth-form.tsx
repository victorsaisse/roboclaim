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
import Link from "next/link";

export function AuthForm({
  variant = "login",
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div"> & {
  variant?: "login" | "signup";
}) {
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
          <form>
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

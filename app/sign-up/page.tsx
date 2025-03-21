import { AuthForm } from "@/components/auth-form";
import { WelcomeHeader } from "@/components/welcome-header";

export default function SignUpPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm space-y-8">
        <WelcomeHeader />
        <AuthForm variant="signup" />
      </div>
    </div>
  );
}

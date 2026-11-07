import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import SignupForm from "@/components/auth/SignupForm";

export const metadata: Metadata = {
  title: "Create Account | Shopcart",
  description: "Join Shopcart and enjoy a smarter shopping experience.",
};

export default function SignupPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Join Shopcart and enjoy a smarter shopping experience!"
      image="/images/auth-signup.jpg"
      imageAlt="White wireless headphones"
    >
      <SignupForm />
    </AuthShell>
  );
}



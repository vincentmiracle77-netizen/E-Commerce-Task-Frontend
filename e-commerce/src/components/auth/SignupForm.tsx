"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import { LockIcon, MailIcon, UserIcon } from "@/components/ui/Icons";
import Checkbox from "./Checkbox";
import GoogleButton from "./GoogleButton";
import OrDivider from "./OrDivider";
import TextField from "./TextField";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
  terms?: string;
}

export default function SignupForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    const confirm = String(data.get("confirm") ?? "");

    const next: Errors = {};
    if (name.length < 2) next.name = "Enter your full name.";
    if (!emailPattern.test(email)) next.email = "Enter a valid email address.";
    if (password.length < 8) next.password = "Use at least 8 characters.";
    if (confirm !== password) next.confirm = "Passwords do not match.";
    if (!data.get("terms")) next.terms = "You must accept the terms to continue.";
    setErrors(next);

    // No backend yet: a valid form sends the user to the login page.
    if (Object.keys(next).length === 0) router.push("/login");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
      <TextField
        label="Full Name"
        name="name"
        autoComplete="name"
        placeholder="Enter your full name"
        icon={<UserIcon width={20} height={20} />}
        error={errors.name}
      />
      <TextField
        label="Email Address"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="Enter your email address"
        icon={<MailIcon width={20} height={20} />}
        error={errors.email}
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        placeholder="Create a password"
        icon={<LockIcon width={20} height={20} />}
        error={errors.password}
      />
      <TextField
        label="Confirm Password"
        name="confirm"
        type="password"
        autoComplete="new-password"
        placeholder="Confirm your password"
        icon={<LockIcon width={20} height={20} />}
        error={errors.confirm}
      />

      <div>
        <Checkbox name="terms">
          I agree to the{" "}
          <Link href="#" className="text-brand-800 underline underline-offset-2">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-brand-800 underline underline-offset-2">
            Privacy Policy
          </Link>
        </Checkbox>
        {errors.terms && (
          <p role="alert" className="mt-1 text-xs text-red-600">
            {errors.terms}
          </p>
        )}
      </div>

      <Button type="submit" className="!h-12 w-full !rounded-xl text-base font-semibold">
        Create Account
      </Button>

      <OrDivider text="Or sign up with" />
      <GoogleButton label="Sign up with Google" />

      <p className="pt-2 text-center text-sm text-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-brand-800 underline underline-offset-2">
          Log in
        </Link>
      </p>
    </form>
  );
}

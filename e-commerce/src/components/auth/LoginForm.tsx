"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import { LockIcon, MailIcon } from "@/components/ui/Icons";
import Checkbox from "./Checkbox";
import GoogleButton from "./GoogleButton";
import OrDivider from "./OrDivider";
import TextField from "./TextField";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    const next: typeof errors = {};
    if (!emailPattern.test(email)) next.email = "Enter a valid email address.";
    if (!password) next.password = "Enter your password.";
    setErrors(next);

    // No backend yet: a valid form simply returns the user to the shop.
    if (Object.keys(next).length === 0) router.push("/");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
        autoComplete="current-password"
        placeholder="Enter your password"
        icon={<LockIcon width={20} height={20} />}
        error={errors.password}
      />

      <div className="flex items-center justify-between">
        <Checkbox name="remember">Remember me</Checkbox>
        <Link href="#" className="text-sm font-medium text-brand-800 underline underline-offset-2">
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="!h-12 w-full !rounded-xl text-base font-semibold">
        Log In
      </Button>

      <OrDivider text="Or continue with" />
      <GoogleButton label="Continue with Google" />

      <p className="pt-2 text-center text-sm text-foreground">
        New to Shopcart?{" "}
        <Link href="/signup" className="font-medium text-brand-800 underline underline-offset-2">
          Create an account
        </Link>
      </p>
    </form>
  );
}

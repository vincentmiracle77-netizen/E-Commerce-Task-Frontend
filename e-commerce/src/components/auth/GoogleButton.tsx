import { GoogleIcon } from "@/components/ui/Icons";

export default function GoogleButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white text-sm font-medium text-foreground transition-colors hover:border-brand-900"
    >
      <GoogleIcon />
      {label}
    </button>
  );
}

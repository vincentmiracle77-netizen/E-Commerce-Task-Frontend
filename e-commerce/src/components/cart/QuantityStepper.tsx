"use client";

import { MinusIcon, PlusIcon } from "@/components/ui/Icons";
import { MAX_QUANTITY } from "@/lib/cart";

interface QuantityStepperProps {
  value: number;
  onChange: (quantity: number) => void;
  onRemove?: () => void;
  label: string;
  size?: "sm" | "md";
}

const sizes = {
  sm: { wrapper: "h-8 gap-0.5 px-1", button: "h-7 w-7", text: "text-[11px]" },
  md: { wrapper: "h-10 gap-1 px-1.5", button: "h-9 w-9", text: "text-sm" },
};

export default function QuantityStepper({
  value,
  onChange,
  onRemove,
  label,
  size = "sm",
}: QuantityStepperProps) {
  const styles = sizes[size];
  const canDecrease = value > 1 || Boolean(onRemove);

  const handleDecrease = () => {
    if (value > 1) onChange(value - 1);
    else onRemove?.();
  };

  return (
    <div
      className={`inline-flex shrink-0 touch-manipulation items-center rounded-full border border-gray-200 bg-white ${styles.wrapper}`}
    >
      <button
        type="button"
        onClick={handleDecrease}
        disabled={!canDecrease}
        aria-label={value > 1 ? `Decrease quantity of ${label}` : `Remove ${label} from cart`}
        className={`flex cursor-pointer items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent ${styles.button}`}
      >
        <MinusIcon width={12} height={12} />
      </button>
      <span
        aria-live="polite"
        className={`min-w-5 text-center font-semibold tabular-nums ${styles.text}`}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= MAX_QUANTITY}
        aria-label={`Increase quantity of ${label}`}
        className={`flex cursor-pointer items-center justify-center rounded-full text-foreground transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-transparent ${styles.button}`}
      >
        <PlusIcon width={12} height={12} />
      </button>
    </div>
  );
}

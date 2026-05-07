import { Camera, Mail } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../lib/utils";
import type { Channel } from "../../data/mockData";

// 
export type BadgeVariant =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "purple";

const badgeVariants: Record<BadgeVariant, string> = {
  neutral: "border-zinc-200 bg-zinc-50 text-zinc-700",
  info: "border-sky-200 bg-sky-50 text-sky-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  danger: "border-rose-200 bg-rose-50 text-rose-700",
  purple: "border-violet-200 bg-violet-50 text-violet-700",
};

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

export function Badge({
  children,
  variant = "neutral",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        badgeVariants[variant],
        className,
      )}
    >
      {children}

    </span>
  );
}

export function ChannelBadge({ channel }: { channel: Channel }) {
  const isEmail = channel === "email";
  const Icon = isEmail ? Mail : Camera;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
        isEmail
          ? "border-sky-200 bg-sky-50 text-sky-700"
          : "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700",
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {isEmail ? "Email" : "Instagram"}
    </span>
  );
}

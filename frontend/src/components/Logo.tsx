import { MessageSquareText } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../lib/utils";

type LogoProps = {
  className?: string;
  to?: string;
};

export function Logo({ className, to = "/" }: LogoProps) {
  const content = (
    <>
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-950 text-white">
        <MessageSquareText className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="text-lg font-semibold text-zinc-950">Relay</span>
    </>
  );

  return (
    <Link to={to} className={cn("inline-flex items-center gap-3", className)}>
      {content}
    </Link>
  );
}

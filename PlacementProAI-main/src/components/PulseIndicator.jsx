import { cn } from "../utils/cn";

export function PulseIndicator({ className }) {
  return (
    <span className={cn("relative flex h-3 w-3", className)}>
      <span className="animate-pulse-fast absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
    </span>
  );
}

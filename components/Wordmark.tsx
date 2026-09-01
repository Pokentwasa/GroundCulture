import { cn } from "@/lib/utils";

interface WordmarkProps {
  className?: string;
  tone?: "ink" | "paper";
  /** Rearrange letters slightly on hover (a small brand moment). */
  playful?: boolean;
}

// Compact single-line lockup used in the nav and loader. The footer builds
// its own oversized stacked version.
export default function Wordmark({
  className,
  tone = "ink",
  playful,
}: WordmarkProps) {
  return (
    <span
      className={cn(
        "display inline-flex select-none items-center leading-none tracking-tight",
        tone === "paper" ? "text-paper" : "text-ink",
        playful && "group",
        className,
      )}
    >
      <span className="transition-transform duration-300 group-hover:-translate-y-[1px]">
        Ground
      </span>
      <span className="mx-[0.15em] inline-block h-[0.5em] w-[0.5em] shrink-0 translate-y-[0.05em] rounded-full bg-chilli transition-transform duration-300 group-hover:rotate-90" />
      <span className="transition-transform duration-300 group-hover:translate-y-[1px]">
        Culture
      </span>
    </span>
  );
}

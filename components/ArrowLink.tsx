import Link from "next/link";
import { cn } from "@/lib/utils";

interface ArrowLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
  /** Solid pill-free button treatment vs. inline text link. */
  variant?: "text" | "block";
  tone?: "ink" | "paper" | "chilli" | "green";
  cursor?: string;
}

const toneMap: Record<string, string> = {
  ink: "bg-ink text-paper",
  paper: "bg-paper text-ink",
  chilli: "bg-chilli text-paper",
  green: "bg-green text-paper",
};

// The house CTA. Arrow nudges up-right on hover. Sharp corners, not a pill.
export default function ArrowLink({
  href,
  children,
  external,
  className,
  variant = "text",
  tone = "ink",
  cursor,
}: ArrowLinkProps) {
  const arrow = (
    <span
      aria-hidden
      className="inline-block translate-y-0 transition-transform duration-200 ease-out-soft group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
    >
      &#8599;
    </span>
  );

  const inner =
    variant === "block" ? (
      <span
        className={cn(
          "group inline-flex items-center gap-3 px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em] transition-colors duration-200",
          toneMap[tone],
          "hover:brightness-110",
        )}
      >
        {children} {arrow}
      </span>
    ) : (
      <span className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.1em]">
        <span className="link-wipe">{children}</span> {arrow}
      </span>
    );

  const cls = cn("inline-flex", className);
  const cursorAttr = cursor ? { "data-cursor": cursor } : {};

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        {...cursorAttr}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} {...cursorAttr}>
      {inner}
    </Link>
  );
}

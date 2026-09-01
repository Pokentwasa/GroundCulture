import { cn } from "@/lib/utils";

interface MediaProps {
  src?: string;
  alt: string;
  /** Placeholder label shown when there's no src yet, e.g. "hero-crowd". */
  slot?: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
}

/**
 * One image primitive for the whole site.
 * - With `src`: renders the real photo (native <img> so there's no image-
 *   optimizer config to break on first deploy; swap to next/image later).
 * - Without `src`: renders an intentional, on-brand poster placeholder that
 *   names the expected asset. No stock photos, no broken image icons.
 */
export default function Media({
  src,
  alt,
  slot,
  className,
  imgClassName,
  eager,
}: MediaProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={cn("h-full w-full object-cover", imgClassName, className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative flex h-full w-full items-center justify-center bg-ink text-paper/70",
        className,
      )}
      role="img"
      aria-label={alt}
    >
      <div className="pointer-events-none absolute inset-3 border border-paper/15" />
      <div className="meta px-4 text-center text-[0.65rem] uppercase tracking-[0.2em]">
        <span className="block text-chilli">Image slot</span>
        <span className="mt-1 block text-paper/60">
          {slot ?? "brand-photo"}
        </span>
      </div>
    </div>
  );
}

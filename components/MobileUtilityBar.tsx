"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

// Thumb-friendly quick actions. Appears after the first screen, phones only.
export default function MobileUtilityBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-[100] grid grid-cols-3 border-t border-paper/20 bg-ink text-paper transition-transform duration-300 lg:hidden",
        show ? "translate-y-0" : "translate-y-full",
      )}
    >
      <Link
        href="/events"
        className="flex items-center justify-center gap-1 border-r border-paper/15 py-4 text-[0.68rem] font-bold uppercase tracking-[0.1em]"
      >
        What&#39;s On
      </Link>
      <a
        href={site.ordering.uberEats}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1 border-r border-paper/15 py-4 text-[0.68rem] font-bold uppercase tracking-[0.1em]"
      >
        Order
      </a>
      <a
        href={site.directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1 py-4 text-[0.68rem] font-bold uppercase tracking-[0.1em]"
      >
        Directions
      </a>
    </div>
  );
}

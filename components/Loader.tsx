"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

// Short intro. Shows once per session (sessionStorage), max ~1.2s, then
// wipes up to reveal the hero. Skipped entirely under reduced motion.
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const seen =
      typeof window !== "undefined" &&
      sessionStorage.getItem("gc-intro") === "1";
    if (seen || prefersReducedMotion()) return;

    setActive(true);
    sessionStorage.setItem("gc-intro", "1");
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const counter = { v: 0 };
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setActive(false);
        },
      });

      tl.to(counter, {
        v: 100,
        duration: 0.9,
        ease: "power1.inOut",
        onUpdate: () => {
          if (count.current)
            count.current.textContent = String(Math.round(counter.v)).padStart(
              3,
              "0",
            );
        },
      })
        .to(root.current, {
          yPercent: -100,
          duration: 0.7,
          ease: "power3.inOut",
        })
        .set(root.current, { display: "none" });
    }, root);

    return () => ctx.revert();
  }, []);

  if (!active) return null;

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-ink px-[var(--gutter)] py-8 text-paper"
    >
      <div className="flex items-center justify-between">
        <span className="meta text-xs uppercase tracking-[0.2em]">
          Ground Culture
        </span>
        <span className="meta text-xs uppercase tracking-[0.2em]">
          CPT / 2026
        </span>
      </div>
      <div className="display d-xl text-paper">
        We are
        <br />
        the culture.
      </div>
      <div className="flex items-end justify-between">
        <span className="meta text-xs uppercase tracking-[0.2em] text-paper/60">
          Loading the room
        </span>
        <span ref={count} className="meta text-4xl md:text-6xl">
          000
        </span>
      </div>
    </div>
  );
}

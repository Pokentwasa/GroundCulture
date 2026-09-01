"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const forWho = ["chefs", "comedians", "musicians", "makers", "Cape Town"];

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".mani-line", {
        opacity: 0,
        y: 28,
        duration: 0.6,
        stagger: 0.14,
        scrollTrigger: { trigger: root.current, start: "top 55%" },
      });
      gsap.from(".mani-for", {
        opacity: 0,
        x: -24,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: { trigger: ".mani-forlist", start: "top 75%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="bg-ink py-24 text-paper md:py-36"
    >
      <div className="u-container">
        <p className="mani-line meta max-w-md text-sm uppercase tracking-[0.16em] text-paper/60">
          We didn&#39;t build this just to sell coffee.
        </p>

        <h2 className="display d-mega mani-line mt-6 text-paper">
          We built
          <br />a platform.
        </h2>

        <ul className="mani-forlist mt-12 flex flex-col gap-1">
          {forWho.map((w) => (
            <li
              key={w}
              className="mani-for display text-4xl leading-tight text-paper/70 md:text-6xl"
            >
              For {w}.
            </li>
          ))}
          <li className="mani-for display mt-4 text-5xl leading-tight text-chilli md:text-8xl">
            For the culture.
          </li>
        </ul>
      </div>
    </section>
  );
}

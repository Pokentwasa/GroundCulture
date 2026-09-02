"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import ArrowLink from "@/components/ArrowLink";

const steps = [
  { n: "01", t: "We cook.", d: "Smash burgers, made fresh on the truck. Same kitchen standard as the cafe." },
  { n: "02", t: "We move.", d: "Blouberg, Sea Point, Claremont, the promenade. The culture travels." },
  { n: "03", t: "We create opportunity.", d: "Every truck champions a chef, turning culinary talent into a business they own." },
  { n: "04", t: "We grow.", d: "More trucks, more chefs, more corners of Cape Town fed. That's the model." },
];

export default function FoodTruck() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setReduced(true);
      return;
    }
    const ctx = gsap.context(() => {
      const el = track.current!;
      const getDistance = () => el.scrollWidth - window.innerWidth;
      gsap.to(el, {
        x: () => -getDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          // Pin duration must match the track's own scroll distance exactly,
          // so GSAP owns both (a fixed vh guess on the section drifts out of
          // sync with content width and cuts the sequence short).
          end: () => `+=${getDistance()}`,
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  // Reduced motion: a plain vertical section, no pinning or horizontal scroll.
  if (reduced) {
    return (
      <section className="bg-green py-16 text-paper">
        <div className="u-container">
          <h2 className="display d-xl text-paper">Culture on wheels.</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {steps.map((s) => (
              <div key={s.n} className="border-t border-paper/20 pt-4">
                <span className="display text-4xl text-paper/40">{s.n}</span>
                <h3 className="display d-md mt-1 text-paper">{s.t}</h3>
                <p className="mt-2 max-w-sm text-sm text-paper/80">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <ArrowLink href="/hire/food-truck" variant="block" tone="chilli">
              Hire for Your Event
            </ArrowLink>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={section} className="relative bg-green text-paper">
      <div className="flex h-[100svh] flex-col overflow-hidden">
        <div className="u-container flex items-center justify-end py-6">
          <span className="meta hidden text-[0.66rem] uppercase tracking-[0.16em] text-paper/60 md:block">
            The food-truck model
          </span>
        </div>

        <div
          ref={track}
          className="flex h-full items-stretch will-change-transform"
        >
          {/* Intro panel */}
          <div className="flex h-full w-screen shrink-0 flex-col justify-center px-[var(--gutter)]">
            <h2 className="display d-mega text-paper">
              Culture
              <br />
              on wheels.
            </h2>
            <p className="mt-4 max-w-sm text-sm text-paper/80">
              One truck. Every corner of the city.
            </p>
          </div>

          {/* Narrative panels */}
          {steps.map((s) => (
            <div
              key={s.n}
              className="flex h-full w-screen shrink-0 flex-col justify-center border-l border-paper/20 px-[var(--gutter)] md:w-[70vw]"
            >
              <span className="display text-[16vw] leading-none text-paper/25 md:text-[10vw]">
                {s.n}
              </span>
              <h3 className="display d-lg mt-2 text-paper">{s.t}</h3>
              <p className="mt-4 max-w-sm text-sm text-paper/80">{s.d}</p>
            </div>
          ))}

          {/* CTA panel */}
          <div className="flex h-full w-screen shrink-0 flex-col justify-center border-l border-paper/20 px-[var(--gutter)] md:w-[60vw]">
            <h3 className="display d-xl text-paper">
              Bring
              <br />
              the truck.
            </h3>
            <div className="mt-6">
              <ArrowLink
                href="/hire/food-truck"
                variant="block"
                tone="chilli"
                cursor="Hire"
              >
                Hire for Your Event
              </ArrowLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

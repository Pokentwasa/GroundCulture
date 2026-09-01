"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const dayList = ["Coffee", "Breakfast", "Lunch", "Work", "Meet", "Connect"];
const nightList = ["Comedy", "Music", "Shows", "Drinks", "Chaos", "Community"];

const WIX = "https://static.wixstatic.com/media";
const dayImg = `${WIX}/207811_6a0ef16d4b5e4131acc381cd999ba848~mv2.jpg/v1/fill/w_1200,h_900,al_c,q_80,enc_avif,quality_auto/207811_6a0ef16d4b5e4131acc381cd999ba848~mv2.jpg`;
const nightImg = `${WIX}/207811_5324246b6b29495c92e73b395addd9a7~mv2.jpeg/v1/fill/w_1200,h_1200,al_c,q_85,enc_auto/207811_5324246b6b29495c92e73b395addd9a7~mv2.jpeg`;

function Column({
  kind,
  list,
}: {
  kind: "day" | "night";
  list: string[];
}) {
  const isDay = kind === "day";
  return (
    <div className="flex h-full flex-col justify-between p-6 md:p-12">
      <span
        className={`meta text-[0.7rem] uppercase tracking-[0.18em] ${
          isDay ? "text-ink/60" : "text-paper/60"
        }`}
      >
        {isDay ? "08:00" : "20:00"}
      </span>
      <h3
        className={`display text-[22vw] leading-[0.8] md:text-[13vw] ${
          isDay ? "text-ink" : "text-paper"
        }`}
      >
        {isDay ? "Day." : "Night."}
      </h3>
      <ul
        className={`flex flex-wrap gap-x-5 gap-y-1 text-sm font-semibold uppercase tracking-[0.08em] ${
          isDay ? "text-ink/80" : "text-paper/80"
        }`}
      >
        {list.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
    </div>
  );
}

export default function DayNight() {
  const section = useRef<HTMLElement>(null);
  const nightLayer = useRef<HTMLDivElement>(null);
  const divider = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reduced motion: show a static 50/50 split instead of the scrub.
      if (prefersReducedMotion()) {
        gsap.set(nightLayer.current, { clipPath: "inset(0% 0% 0% 50%)" });
        gsap.set(divider.current, { left: "50%" });
        return;
      }

      gsap.set(nightLayer.current, { clipPath: "inset(0% 0% 0% 100%)" });
      gsap.set(divider.current, { xPercent: 0, left: "100%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: "+=120%",
          scrub: 0.6,
        },
      });

      tl.to(
        nightLayer.current,
        { clipPath: "inset(0% 0% 0% 0%)", ease: "none" },
        0,
      ).to(divider.current, { left: "0%", ease: "none" }, 0);
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} className="relative h-[240vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="u-container absolute left-0 right-0 top-6 z-30 md:top-10">
          <span className="section-index text-ink/60">
            02 / <span className="text-chilli">Two sides, same culture</span>
          </span>
        </div>

        {/* DAY base layer */}
        <div className="absolute inset-0 bg-paper">
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage: `url(${dayImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="relative z-10 h-full">
            <Column kind="day" list={dayList} />
          </div>
        </div>

        {/* NIGHT overlay (scrubbed wipe). Default-clipped so it never
            flashes over DAY before JS initialises. */}
        <div
          ref={nightLayer}
          className="absolute inset-0 bg-ink"
          style={{ clipPath: "inset(0% 0% 0% 100%)" }}
        >
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `url(${nightImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="relative z-10 h-full">
            <Column kind="night" list={nightList} />
          </div>
        </div>

        {/* moving divider */}
        <div
          ref={divider}
          className="absolute top-0 z-40 hidden h-full w-[3px] bg-chilli md:block"
        />
      </div>
    </section>
  );
}

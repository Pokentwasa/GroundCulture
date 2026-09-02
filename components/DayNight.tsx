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
    <div className="relative flex h-full flex-col justify-between p-6 md:p-12">
      {/* Bottom scrim: protects the tag list without dimming the photo
          behind the headline. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t ${
          isDay ? "from-paper/90 via-paper/25" : "from-ink/90 via-ink/25"
        } to-transparent`}
      />

      <span
        className={`meta relative w-fit text-[0.7rem] uppercase tracking-[0.18em] ${
          isDay ? "bg-paper/80 text-ink/70" : "bg-ink/70 text-paper/70"
        } px-2.5 py-1`}
      >
        {isDay ? "08:00" : "20:00"}
      </span>

      <h3
        className={`display text-[22vw] leading-[0.8] md:text-[13vw] ${
          isDay
            ? "text-ink [filter:drop-shadow(0_6px_28px_rgba(241,236,222,0.85))]"
            : "text-paper [filter:drop-shadow(0_6px_28px_rgba(0,0,0,0.7))]"
        }`}
      >
        {isDay ? "Day." : "Night."}
      </h3>

      <ul
        className={`relative flex flex-wrap gap-x-2 gap-y-2 text-sm font-semibold uppercase tracking-[0.08em] ${
          isDay ? "text-ink" : "text-paper"
        }`}
      >
        {list.map((x) => (
          <li
            key={x}
            className={isDay ? "bg-paper/80 px-2.5 py-1" : "bg-ink/70 px-2.5 py-1"}
          >
            {x}
          </li>
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
        {/* DAY base layer. The photo is the interface here, not a tint
            behind it — text protects itself (scrim + chips) instead of
            the image getting dimmed. */}
        <div className="absolute inset-0 bg-paper">
          <div
            className="absolute inset-0"
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
            className="absolute inset-0"
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

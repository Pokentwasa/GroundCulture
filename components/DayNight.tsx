"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

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
  // The real photos run against the "day = light bg, night = dark bg"
  // assumption: the day shot skews moody/dark, the night shot (a bright
  // event flyer) skews light. Text protects itself against whichever
  // photo actually landed here, so the treatment is keyed to that, not
  // to the day/night label.
  const light = isDay; // day text is light-on-dark; night text is dark-on-light
  return (
    <div className="relative flex h-full flex-col justify-between p-6 md:p-12">
      {/* Bottom scrim: protects the tag list without dimming the photo
          behind the headline. */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t ${
          light ? "from-ink/90 via-ink/25" : "from-paper/90 via-paper/25"
        } to-transparent`}
      />

      <span
        className={`meta relative w-fit text-[0.7rem] uppercase tracking-[0.18em] ${
          light ? "bg-ink/70 text-paper/70" : "bg-paper/80 text-ink/70"
        } px-2.5 py-1`}
      >
        {isDay ? "08:00" : "20:00"}
      </span>

      <h3
        className={`display text-[22vw] leading-[0.8] md:text-[13vw] ${
          light
            ? "text-paper [filter:drop-shadow(0_6px_28px_rgba(0,0,0,0.7))]"
            : "text-ink [filter:drop-shadow(0_6px_28px_rgba(241,236,222,0.85))]"
        }`}
      >
        {isDay ? "Day." : "Night."}
      </h3>

      <ul
        className={`relative flex flex-wrap gap-x-2 gap-y-2 text-sm font-semibold uppercase tracking-[0.08em] ${
          light ? "text-paper" : "text-ink"
        }`}
      >
        {list.map((x) => (
          <li
            key={x}
            className={light ? "bg-ink/70 px-2.5 py-1" : "bg-paper/80 px-2.5 py-1"}
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
  const pinTarget = useRef<HTMLDivElement>(null);
  const nightPhoto = useRef<HTMLDivElement>(null);
  const dayText = useRef<HTMLDivElement>(null);
  const nightText = useRef<HTMLDivElement>(null);
  const divider = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reduced motion: show a static 50/50 split instead of the scrub.
      if (prefersReducedMotion()) {
        gsap.set(nightPhoto.current, { clipPath: "inset(0% 50% 0% 0%)" });
        gsap.set(nightText.current, { opacity: 1, clipPath: "inset(0% 50% 0% 0%)" });
        gsap.set(dayText.current, { clipPath: "inset(0% 0% 0% 50%)" });
        gsap.set(divider.current, { left: "50%" });
        return;
      }

      gsap.set(nightPhoto.current, { clipPath: "inset(0% 100% 0% 0%)" });
      gsap.set(nightText.current, { opacity: 0 });
      gsap.set(divider.current, { left: "0%" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${window.innerHeight}`,
          scrub: 0.6,
          pin: pinTarget.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // The photo wipe runs the full scrub (the cinematic part). The text
      // swap runs fast, over just the first slice of it, as a clean
      // crossfade rather than getting physically sliced by the moving
      // clip line - that's what made Day's headline linger and garble
      // together with Night's.
      tl.to(nightPhoto.current, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", duration: 1 }, 0)
        .to(divider.current, { left: "100%", ease: "none", duration: 1 }, 0)
        .to(dayText.current, { opacity: 0, ease: "none", duration: 0.28 }, 0)
        .to(nightText.current, { opacity: 1, ease: "none", duration: 0.28 }, 0);
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} className="relative">
      <div ref={pinTarget} className="relative h-[100svh] overflow-hidden">
        {/* DAY photo - the permanent base, never clipped. */}
        <div
          className="absolute inset-0 bg-ink"
          style={{
            backgroundImage: `url(${dayImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* NIGHT photo - wipes in over the day photo. */}
        <div
          ref={nightPhoto}
          className="absolute inset-0 bg-paper"
          style={{
            backgroundImage: `url(${nightImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            clipPath: "inset(0% 100% 0% 0%)",
          }}
        />

        {/* Text overlays - crossfade independently of the photo clip, so
            neither headline is ever sliced mid-word by the wipe line. */}
        <div ref={dayText} className="absolute inset-0 z-10">
          <Column kind="day" list={dayList} />
        </div>
        <div ref={nightText} className="absolute inset-0 z-10 opacity-0">
          <Column kind="night" list={nightList} />
        </div>

        {/* moving divider */}
        <div
          ref={divider}
          className="absolute top-0 z-20 hidden h-full w-[3px] bg-chilli md:block"
        />
      </div>
    </section>
  );
}

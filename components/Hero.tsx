"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { site } from "@/lib/site";
import ArrowLink from "@/components/ArrowLink";

const WIX = "https://static.wixstatic.com/media";
const badge = `${WIX}/207811_42d13c358557402bbb7e3e283b6da0e5~mv2.png/v1/fill/w_1564,h_1991,al_c,q_95,enc_avif,quality_auto/GROUND%20CULTURE%20BA%20LOGO%20_edited_edited_pn.png`;

const rotating = ["FOOD", "COMEDY", "PEOPLE", "CAPE TOWN"];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [word, setWord] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setWord((w) => (w + 1) % rotating.length),
      1900,
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.35,
        defaults: { ease: "power4.out" },
      });

      tl.from(".hero-line > span", {
        yPercent: 115,
        duration: 1,
        stagger: 0.12,
      })
        // The badge arrives just after the headline settles, not with it.
        .from(
          ".hero-badge",
          {
            opacity: 0,
            scale: 0.85,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.25",
        )
        .from(
          ".hero-fade",
          { opacity: 0, y: 16, duration: 0.7, stagger: 0.08 },
          "-=0.6",
        );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-ink pt-28 text-paper md:pt-32"
    >
      {/* Top eyebrow */}
      <div className="u-container hero-fade relative z-10 flex items-center justify-between">
        <span className="meta text-[0.7rem] uppercase tracking-[0.2em] text-paper/70">
          {site.hq.city}, {site.hq.country}
        </span>
        <span className="meta hidden text-[0.7rem] uppercase tracking-[0.2em] text-paper/70 sm:block">
          33&#176;56&#8242;S / 18&#176;28&#8242;E
        </span>
      </div>

      {/* Mega type */}
      <div className="u-container relative z-10">
        <h1 className="display text-paper">
          <span className="hero-line reveal-line d-mega block">
            <span className="block">We are</span>
          </span>
          <span className="hero-line reveal-line d-mega block">
            <span className="block">
              the cult<span className="text-green-2">u</span>re.
            </span>
          </span>
        </h1>

        {/* Brand mark, arrives shortly after the headline. */}
        <div
          aria-hidden
          className="hero-badge pointer-events-none absolute right-[2%] top-1/2 hidden w-[16vw] max-w-[220px] -translate-y-1/2 opacity-90 md:block"
        >
          <img src={badge} alt="" className="h-full w-full object-contain" />
        </div>

        <div className="hero-fade mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-sm">
            <p className="text-lg font-medium text-paper/90">{site.shortPitch}</p>
            <p className="meta mt-2 text-[0.72rem] uppercase tracking-[0.16em] text-paper/60">
              <span className="text-chilli">/</span>{" "}
              <span key={word} className="inline-block">
                {rotating[word]}
              </span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <ArrowLink href="/events" variant="block" tone="paper" cursor="What's on">
              See What&#39;s On
            </ArrowLink>
            <ArrowLink href="/menu" variant="block" tone="chilli" cursor="Eat">
              Come Eat
            </ArrowLink>
          </div>
        </div>
      </div>

      {/* Bottom utility bar */}
      <div className="u-container hero-fade relative z-10 mt-10 flex flex-col gap-3 border-t border-paper/15 pt-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-x-4 gap-y-1 meta text-[0.68rem] uppercase tracking-[0.16em] text-paper/70">
          <span>Observatory</span>
          <span className="text-chilli">/</span>
          <span>Blouberg</span>
          <span className="text-chilli">/</span>
          <span>Claremont</span>
          <span className="text-chilli">/</span>
          <span>Sea Point</span>
          <span className="text-chilli">/</span>
          <span>Prom Park</span>
        </div>
        <span className="meta flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.16em] text-paper/70">
          Scroll to get grounded
          <span aria-hidden className="animate-bounce">
            &#8595;
          </span>
        </span>
      </div>
    </section>
  );
}

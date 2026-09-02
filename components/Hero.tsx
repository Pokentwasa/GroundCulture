"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { site } from "@/lib/site";
import ArrowLink from "@/components/ArrowLink";

const WIX = "https://static.wixstatic.com/media";
const heroPhoto = `${WIX}/207811_22ba6416bbaf403db2092c3597e33571~mv2.jpg/v1/fill/w_1800,h_1400,al_c,q_85,enc_avif,quality_auto/207811_22ba6416bbaf403db2092c3597e33571~mv2.jpg`;

const rotating = ["FOOD", "COMEDY", "PEOPLE", "CAPE TOWN"];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const photo = useRef<HTMLDivElement>(null);
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

      tl.from(".hero-photo", {
        clipPath: "inset(0% 0% 100% 0%)",
        scale: 1.15,
        duration: 1.3,
        ease: "power3.out",
      })
        .from(
          ".hero-line > span",
          { yPercent: 115, duration: 1, stagger: 0.12 },
          "-=0.9",
        )
        .from(
          ".hero-fade",
          { opacity: 0, y: 16, duration: 0.7, stagger: 0.08 },
          "-=0.7",
        );

      // Gentle mouse parallax on the photo (fine pointers only) - a slow
      // pan/scale rather than a translate, so no edge ever exposes.
      if (window.matchMedia("(pointer: fine)").matches) {
        const onMove = (e: PointerEvent) => {
          const cx = e.clientX / window.innerWidth - 0.5;
          const cy = e.clientY / window.innerHeight - 0.5;
          gsap.to(photo.current, {
            xPercent: cx * -3,
            yPercent: cy * -3,
            duration: 1.2,
            ease: "power2.out",
          });
        };
        window.addEventListener("pointermove", onMove);
        return () => window.removeEventListener("pointermove", onMove);
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-28 md:pt-32"
    >
      {/* Full-bleed hero photograph. Text protects itself (scrims / chips /
          drop-shadow) rather than the photo getting dimmed - see the
          Day/Night section for the same principle. */}
      <div className="hero-photo absolute inset-0 -z-0 overflow-hidden bg-ink">
        <div ref={photo} className="absolute inset-[-4%]">
          <img
            src={heroPhoto}
            alt="Ground Culture, Observatory"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-paper/85 via-paper/10 to-paper/80" />
      </div>

      {/* Top eyebrow */}
      <div className="u-container hero-fade relative z-10 flex items-center justify-between">
        <span className="meta bg-paper/80 px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.2em] text-ink/70">
          {site.hq.city}, {site.hq.country}
        </span>
        <span className="meta hidden bg-paper/80 px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.2em] text-ink/70 sm:block">
          33&#176;56&#8242;S / 18&#176;28&#8242;E
        </span>
      </div>

      {/* Mega type */}
      <div className="u-container relative z-10">
        <h1 className="display text-ink [filter:drop-shadow(0_8px_32px_rgba(241,236,222,0.9))]">
          <span className="hero-line reveal-line d-mega block">
            <span className="block">We are</span>
          </span>
          <span className="hero-line reveal-line d-mega block">
            <span className="block">
              the cult<span className="text-green">u</span>re.
            </span>
          </span>
        </h1>

        <div className="hero-fade mt-6 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-sm bg-paper/80 p-3">
            <p className="text-lg font-medium">{site.shortPitch}</p>
            <p className="meta mt-2 text-[0.72rem] uppercase tracking-[0.16em] text-ink/60">
              <span className="text-chilli">/</span>{" "}
              <span key={word} className="inline-block">
                {rotating[word]}
              </span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <ArrowLink href="/events" variant="block" tone="ink" cursor="What's on">
              See What&#39;s On
            </ArrowLink>
            <ArrowLink href="/menu" variant="block" tone="chilli" cursor="Eat">
              Come Eat
            </ArrowLink>
          </div>
        </div>
      </div>

      {/* Bottom utility bar */}
      <div className="u-container hero-fade relative z-10 mt-10 flex flex-col gap-3 border-t border-ink/15 bg-paper/80 px-3 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-x-4 gap-y-1 meta text-[0.68rem] uppercase tracking-[0.16em] text-ink/70">
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
        <span className="meta flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.16em] text-ink/70">
          Scroll to get grounded
          <span aria-hidden className="animate-bounce">
            &#8595;
          </span>
        </span>
      </div>
    </section>
  );
}

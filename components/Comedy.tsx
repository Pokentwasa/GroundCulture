"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import ArrowLink from "@/components/ArrowLink";

const WIX = "https://static.wixstatic.com/media";
const posters = [
  {
    src: `${WIX}/207811_dfdad28a0e554126ac21263ba7c9f136~mv2.jpeg/v1/fill/w_500,h_720,al_c,q_85,enc_auto/207811_dfdad28a0e554126ac21263ba7c9f136~mv2.jpeg`,
    pos: "left-0 top-[6%] w-[38%] md:w-[22%]",
    speed: -60,
  },
  {
    src: `${WIX}/207811_73448ef5538b4221a3586a2fd42e7448~mv2.jpg/v1/fill/w_520,h_520,al_c,q_85,enc_auto/207811_73448ef5538b4221a3586a2fd42e7448~mv2.jpg`,
    pos: "right-[3%] top-0 w-[42%] md:w-[24%]",
    speed: -110,
  },
  {
    src: `${WIX}/207811_4f24dc6d129b43908e052ff3c5aebd9e~mv2.jpeg/v1/fill/w_500,h_680,al_c,q_85,enc_auto/207811_4f24dc6d129b43908e052ff3c5aebd9e~mv2.jpeg`,
    pos: "left-[8%] bottom-[4%] w-[40%] md:w-[20%]",
    speed: -40,
  },
  {
    src: `${WIX}/207811_3927d497be5d4c6a902000205088f358~mv2.png/v1/fill/w_600,h_450,al_c,q_90,enc_auto/207811_3927d497be5d4c6a902000205088f358~mv2.png`,
    pos: "right-[6%] bottom-[8%] w-[44%] md:w-[26%]",
    speed: -80,
  },
];

export default function Comedy() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".comedy-poster").forEach((el) => {
        const speed = Number(el.dataset.speed || -60);
        gsap.to(el, {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-paper py-20 md:py-32"
    >
      {/* Poster field */}
      <div className="pointer-events-none absolute inset-0">
        {posters.map((p, i) => (
          <div
            key={i}
            data-speed={p.speed}
            className={`comedy-poster poster absolute aspect-[3/4] overflow-hidden [box-shadow:5px_5px_0_0_var(--gc-ink)] ${p.pos}`}
          >
            <img src={p.src} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>

      <div className="u-container relative z-10 flex min-h-[60vh] flex-col items-center justify-center text-center">
        <span className="section-index text-ink/60">
          07 / <span className="text-chilli">Laugh</span>
        </span>
        <h2 className="display d-mega mt-4 text-ink mix-blend-multiply">
          Cape Town
          <br />
          comes here
          <br />
          to laugh.
        </h2>
        <p className="mt-6 max-w-sm text-sm text-ink/70">
          Weekly comedy nights, open mics and touring headliners. South
          Africa&#39;s fastest-growing comedy club.
        </p>
        <div className="mt-8">
          <ArrowLink href="/events" variant="block" tone="chilli" cursor="Tickets">
            See Comedy Shows
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}

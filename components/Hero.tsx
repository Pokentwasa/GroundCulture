"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { site } from "@/lib/site";
import ArrowLink from "@/components/ArrowLink";
import { cn } from "@/lib/utils";

const WIX = "https://static.wixstatic.com/media";
const fist = `${WIX}/207811_42d13c358557402bbb7e3e283b6da0e5~mv2.png/v1/fill/w_1564,h_1991,al_c,q_95,enc_avif,quality_auto/GROUND%20CULTURE%20BA%20LOGO%20_edited_edited_pn.png`;
// Placeholder for "the room full of people" - picked blind (this sandbox
// can't preview static.wixstatic.com), the widest/group-style shot already
// in use elsewhere on the site. Swap this one URL for the real crowd shot.
const roomPhoto = `${WIX}/207811_a3f8f4b48c88449d917f902eedcd787b~mv2.jpg/v1/fill/w_1800,h_1200,al_c,q_85,enc_avif,quality_auto/207811_a3f8f4b48c88449d917f902eedcd787b~mv2.jpg`;

const rotating = ["FOOD", "COMEDY", "PEOPLE", "CAPE TOWN"];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const pinTarget = useRef<HTMLDivElement>(null);
  const textStage = useRef<HTMLDivElement>(null);
  const fistStage = useRef<HTMLDivElement>(null);
  const photoStage = useRef<HTMLDivElement>(null);
  const [word, setWord] = useState(0);
  // Declarative, not an imperative one-time gsap.set(): React re-renders
  // (StrictMode's double-effect in dev, or anything else later) would
  // otherwise silently undo a style GSAP set outside its own animation
  // lifecycle, since React doesn't know it happened.
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(prefersReducedMotion());
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setWord((w) => (w + 1) % rotating.length),
      1900,
    );
    return () => clearInterval(id);
  }, []);

  // Intro reveal for the chrome (eyebrow / pitch / CTAs / utility bar).
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-fade", {
        opacity: 0,
        y: 16,
        duration: 0.7,
        stagger: 0.08,
        delay: 0.3,
        ease: "power4.out",
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Scroll-driven centrepiece: headline -> fist (grows in big, then STAYS
  // - it's a permanent fixture once it arrives, not a stage that passes
  // through) -> room photo fading in behind it as the permanent backdrop.
  // The chrome (eyebrow / CTAs / utility bar) clears out of the way while
  // the fist is arriving, then returns once the fist+photo composition
  // has settled. Pinned for its own scroll distance (GSAP-owned, not a
  // guessed CSS height - see the Day/Night and food-truck fixes for why
  // that matters); every stage is an independent transform/opacity tween,
  // never a clip-path, so nothing gets sliced mid-transition.
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const chrome = gsap.utils.toArray<HTMLElement>(".hero-fade");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 1.3}`,
          scrub: 0.6,
          pin: pinTarget.current,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(chrome, { opacity: 0, y: -10, duration: 0.1, ease: "none" }, 0)
        .to(textStage.current, { opacity: 0, scale: 0.9, duration: 0.22, ease: "none" }, 0)
        .fromTo(
          fistStage.current,
          { scale: 0.45 },
          { scale: 1.08, duration: 0.3, ease: "power2.out" },
          0.08,
        )
        .to(fistStage.current, { opacity: 1, duration: 0.18, ease: "none" }, 0.08)
        // Fist holds at full size from here - no further tween touches
        // it, so it simply stays.
        .to(photoStage.current, { opacity: 1, duration: 0.3, ease: "none" }, 0.4)
        .to(chrome, { opacity: 1, y: 0, duration: 0.18, ease: "none" }, 0.72);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-ink text-paper">
      <div
        ref={pinTarget}
        className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-28 md:pt-32"
      >
        {/* Stage 1: the headline, centred. */}
        <div
          ref={textStage}
          className={cn(
            "pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-[var(--gutter)]",
            reduced && "opacity-0",
          )}
        >
          <h1 className="display d-mega text-center text-paper">
            We are
            <br />
            the cult<span className="text-green-2">u</span>re.
          </h1>
        </div>

        {/* Stage 2: the fist - grows in big, then stays: a permanent
            fixture over the photo, not a stage that passes through. */}
        <div
          ref={fistStage}
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 z-10 flex origin-center items-center justify-center will-change-transform",
            reduced ? "opacity-100" : "opacity-0",
          )}
        >
          <img src={fist} alt="" className="h-[82vh] w-auto max-w-[92vw] object-contain" />
        </div>

        {/* Stage 3: the room, full-bleed. */}
        <div
          ref={photoStage}
          aria-hidden
          className={cn("absolute inset-0 z-0", reduced ? "opacity-100" : "opacity-0")}
        >
          <img src={roomPhoto} alt="" className="h-full w-full object-cover" />
          {/* Dark enough that the fist's white line-art stays crisp on
              top of a busy photo, light enough that the photo still
              reads clearly underneath. */}
          <div className="absolute inset-0 bg-ink/45" />
        </div>

        {/* Top eyebrow */}
        <div className="u-container hero-fade relative z-20 flex items-center justify-between">
          <span className="meta bg-ink/60 px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.2em] text-paper/70">
            {site.hq.city}, {site.hq.country}
          </span>
          <span className="meta hidden bg-ink/60 px-2.5 py-1 text-[0.7rem] uppercase tracking-[0.2em] text-paper/70 sm:block">
            33&#176;56&#8242;S / 18&#176;28&#8242;E
          </span>
        </div>

        {/* CTA row - sits below the crossfading centrepiece. */}
        <div className="u-container hero-fade relative z-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-sm bg-ink/60 p-3">
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
        <div className="u-container hero-fade relative z-20 mt-10 flex flex-col gap-3 border-t border-paper/15 bg-ink/60 px-3 py-4 md:flex-row md:items-center md:justify-between">
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
      </div>
    </section>
  );
}

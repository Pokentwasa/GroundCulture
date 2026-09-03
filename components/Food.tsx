"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { site } from "@/lib/site";
import ArrowLink from "@/components/ArrowLink";

const WIX = "https://static.wixstatic.com/media";
const burger = `${WIX}/207811_dbdecfadf1434e519714514f113d81ca~mv2.jpg/v1/fill/w_1000,h_1000,al_c,q_85,enc_avif,quality_auto/207811_dbdecfadf1434e519714514f113d81ca~mv2.jpg`;

const annotations: { text: string; pos: string; rotate: string }[] = [
  { text: "Smashed daily", pos: "left-0 top-[8%]", rotate: "-rotate-3" },
  { text: "Local Halaal butchers", pos: "right-0 top-[20%]", rotate: "rotate-2" },
  { text: "Made in-house", pos: "left-[4%] bottom-[26%]", rotate: "rotate-1" },
  { text: "Cape Town", pos: "right-[2%] bottom-[10%]", rotate: "-rotate-2" },
];

export default function Food() {
  const root = useRef<HTMLElement>(null);
  const img = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.to(img.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.from(".food-note", {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 60%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="bg-paper-2 py-16 md:py-28">
      <div className="u-container">
        <span className="section-index text-ink/60">
          02 / <span className="text-chilli">Eat</span>
        </span>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          {/* Copy */}
          <div>
            <h2 className="display d-xl text-ink">
              Good food
              <br />
              brings people
              <br />
              together.
            </h2>
            <p className="meta mt-6 text-[0.75rem] uppercase tracking-[0.16em] text-ink/70">
              Locally sourced. Proudly South African.
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/75">
              Whether you&#39;re sitting down at the cafe in Observatory or
              grabbing a smash burger from a truck across the city, it&#39;s
              fresh flavours, quality ingredients and authentic local taste.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ArrowLink href="/menu" variant="block" tone="ink" cursor="Menu">
                View the Full Menu
              </ArrowLink>
              <ArrowLink
                href={site.contact.whatsappOrder}
                external
                variant="block"
                tone="green"
                cursor="Order"
              >
                Order on WhatsApp
              </ArrowLink>
              <ArrowLink
                href={site.ordering.uberEats}
                external
                variant="block"
                tone="chilli"
              >
                Uber Eats
              </ArrowLink>
            </div>
          </div>

          {/* Image with annotations */}
          <div className="relative">
            <div className="poster relative aspect-square w-full overflow-hidden [box-shadow:8px_8px_0_0_var(--gc-ink)]">
              <div ref={img} className="absolute inset-0 scale-110">
                <Image
                  src={burger}
                  alt="A Ground Culture smash burger"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
            {annotations.map((a) => (
              <span
                key={a.text}
                className={`food-note meta absolute ${a.pos} ${a.rotate} whitespace-nowrap bg-paper px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-ink [box-shadow:3px_3px_0_0_var(--gc-chilli)]`}
              >
                {a.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

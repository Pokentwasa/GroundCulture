"use client";

import Link from "next/link";
import { useState } from "react";
import { locations } from "@/data/locations";
import Media from "@/components/Media";
import { cn } from "@/lib/utils";

export default function Locations() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-ink py-16 text-paper md:py-28">
      {/* Hover backdrop (desktop) */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        {locations.map((l, i) => (
          <div
            key={l.slug}
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              hover === i ? "opacity-30" : "opacity-0",
            )}
          >
            <Media src={l.image} alt="" slot={`location-${l.slug}`} />
          </div>
        ))}
      </div>

      <div className="u-container relative z-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="section-index text-paper/50">
              03 / <span className="text-chilli">Find us</span>
            </span>
            <h2 className="display d-xl mt-3 text-paper">
              Where
              <br />
              you at?
            </h2>
          </div>
          <p className="max-w-xs text-sm text-paper/70 md:text-right">
            One culture. Different corners of Cape Town. Each spot does its own
            thing.
          </p>
        </div>

        {/* Rows */}
        <ul className="mt-10 border-t border-paper/15">
          {locations.map((l, i) => (
            <li key={l.slug}>
              <Link
                href={`/locations/${l.slug}`}
                data-cursor="Explore"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                className="group flex flex-col gap-3 border-b border-paper/15 py-5 md:flex-row md:items-center md:justify-between md:py-6"
              >
                <div className="flex items-baseline gap-4 md:gap-8">
                  <span className="meta text-xs text-chilli">
                    0{i + 1}
                  </span>
                  <span className="display text-5xl leading-none text-paper transition-transform duration-300 ease-out-soft group-hover:translate-x-3 md:text-8xl">
                    {l.name}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 pl-8 md:pl-0">
                  {l.services.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="border border-paper/25 px-2.5 py-1 meta text-[0.58rem] uppercase tracking-[0.12em] text-paper/70"
                    >
                      {s}
                    </span>
                  ))}
                  <span
                    aria-hidden
                    className="ml-1 hidden text-paper/60 transition-transform duration-300 group-hover:translate-x-1 md:inline"
                  >
                    &#8599;
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

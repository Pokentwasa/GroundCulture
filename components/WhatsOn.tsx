"use client";

import { useMemo, useState } from "react";
import type { GcEvent, EventCategory } from "@/lib/types";
import { sortedEvents, categoryLabel } from "@/data/events";
import EventCarousel from "@/components/EventCarousel";
import ArrowLink from "@/components/ArrowLink";
import { cn } from "@/lib/utils";

type Filter = "all" | EventCategory;

export default function WhatsOn() {
  const all = useMemo(() => sortedEvents(), []);
  const [filter, setFilter] = useState<Filter>("all");

  const filters = useMemo(() => {
    const cats = Array.from(new Set(all.map((e) => e.category))) as GcEvent["category"][];
    return ["all", ...cats] as Filter[];
  }, [all]);

  const visible = useMemo(
    () => (filter === "all" ? all : all.filter((e) => e.category === filter)),
    [all, filter],
  );

  return (
    <section id="whats-on" className="relative py-16 md:py-24">
      <div className="u-container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="section-index text-ink/60">
              01 / <span className="text-chilli">Tonight</span>
            </span>
            <h2 className="display d-xl mt-3 text-ink">
              What&#39;s
              <br />
              happening?
            </h2>
          </div>
          <p className="max-w-xs text-sm text-ink/70 md:text-right">
            Find your night.
          </p>
        </div>

        <div className="no-bar mt-8 flex gap-2 overflow-x-auto pb-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "shrink-0 border px-4 py-2 text-[0.7rem] font-bold uppercase tracking-[0.12em] transition-colors",
                filter === f
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/25 text-ink/70 hover:border-ink",
              )}
            >
              {f === "all" ? "All" : categoryLabel(f)}
            </button>
          ))}
        </div>
      </div>

      {visible.length > 0 ? (
        <>
          <EventCarousel events={visible} />
          <div className="u-container mt-10 flex justify-center">
            <ArrowLink href="/events" variant="block" tone="green">
              See All Events
            </ArrowLink>
          </div>
        </>
      ) : (
        <div className="u-container mt-12 border border-ink/20 p-10 text-center">
          <h3 className="display d-md text-ink">
            Nothing announced.
            <br />
            Yet.
          </h3>
          <p className="mx-auto mt-4 max-w-sm text-sm text-ink/70">
            Follow us on Instagram to catch the next one the moment it drops.
          </p>
          <div className="mt-6 flex justify-center">
            <ArrowLink
              href="https://www.instagram.com/groundculture_/"
              external
              variant="block"
              tone="ink"
            >
              Follow @groundculture_
            </ArrowLink>
          </div>
        </div>
      )}
    </section>
  );
}

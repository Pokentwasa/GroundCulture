"use client";

import { useMemo, useRef, useState } from "react";
import type { GcEvent, EventCategory } from "@/lib/types";
import { sortedEvents, categoryLabel } from "@/data/events";
import EventPoster from "@/components/EventPoster";
import EventModal from "@/components/EventModal";
import ArrowLink from "@/components/ArrowLink";
import { cn } from "@/lib/utils";

type Filter = "all" | EventCategory;

export default function WhatsOn() {
  const all = useMemo(() => sortedEvents(), []);
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<GcEvent | null>(null);
  const rail = useRef<HTMLDivElement>(null);

  const filters = useMemo(() => {
    const cats = Array.from(new Set(all.map((e) => e.category)));
    return ["all", ...cats] as Filter[];
  }, [all]);

  const visible = useMemo(
    () => (filter === "all" ? all : all.filter((e) => e.category === filter)),
    [all, filter],
  );

  // Pointer drag-to-scroll on the rail (touch already scrolls natively).
  const drag = useRef({ down: false, startX: 0, scroll: 0, moved: false });
  const onDown = (e: React.PointerEvent) => {
    const el = rail.current;
    if (!el) return;
    drag.current = {
      down: true,
      startX: e.clientX,
      scroll: el.scrollLeft,
      moved: false,
    };
    el.classList.add("grabbing");
  };
  const onMove = (e: React.PointerEvent) => {
    const el = rail.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.scroll - dx;
  };
  const onUp = () => {
    drag.current.down = false;
    rail.current?.classList.remove("grabbing");
  };

  return (
    <section id="whats-on" className="relative py-16 md:py-24">
      <div className="u-container">
        {/* Heading row */}
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
            Ground Culture is alive because things happen here. Drag through
            the wall. Grab a ticket.
          </p>
        </div>

        {/* Filters */}
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

      {/* Rail */}
      {visible.length > 0 ? (
        <div
          ref={rail}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={onUp}
          className="no-bar mt-8 flex touch-pan-y snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-6 grab select-none"
        >
          {visible.map((e) => (
            <div key={e.slug} className="snap-start">
              <EventPoster
                event={e}
                onOpen={(ev) => {
                  if (!drag.current.moved) setActive(ev);
                }}
              />
            </div>
          ))}
          <div className="flex w-[60vw] shrink-0 items-center sm:w-[30vw] lg:w-[18vw]">
            <ArrowLink href="/events" variant="block" tone="green">
              See All Events
            </ArrowLink>
          </div>
        </div>
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

      <EventModal event={active} onClose={() => setActive(null)} />
    </section>
  );
}

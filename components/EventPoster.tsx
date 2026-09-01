"use client";

import { useEffect, useState } from "react";
import type { GcEvent } from "@/lib/types";
import { categoryLabel } from "@/data/events";
import {
  formatEventDate,
  dayNum,
  monthShort,
  relativeDayLabel,
} from "@/lib/date";
import Media from "@/components/Media";
import { cn } from "@/lib/utils";

const ctaLabel: Record<string, string> = {
  tickets: "Get Tickets",
  rsvp: "RSVP",
  details: "Details",
};

export default function EventPoster({
  event,
  onOpen,
  className,
  fill,
}: {
  event: GcEvent;
  onOpen: (e: GcEvent) => void;
  className?: string;
  /** Fill its grid cell instead of the fixed rail width. */
  fill?: boolean;
}) {
  const [rel, setRel] = useState("");
  useEffect(() => {
    setRel(relativeDayLabel(event.date, new Date()));
  }, [event.date]);

  return (
    <article
      className={cn(
        "group relative flex flex-col bg-paper-2 transition-transform duration-300 ease-out-soft hover:-translate-y-2",
        fill
          ? "w-full"
          : "w-[80vw] shrink-0 sm:w-[46vw] lg:w-[26vw] xl:w-[22vw]",
        "[box-shadow:6px_6px_0_0_var(--gc-ink)]",
        className,
      )}
    >
      <button
        onClick={() => onOpen(event)}
        data-cursor="View event"
        className="flex flex-1 flex-col text-left"
        aria-label={`View ${event.title}`}
      >
        {/* Artwork */}
        <div className="poster relative aspect-[4/5] w-full overflow-hidden">
          <Media
            src={event.image}
            alt={event.title}
            slot={`event-${event.slug}`}
            imgClassName="transition-transform duration-500 ease-out-soft group-hover:scale-[1.04]"
          />
          <div className="absolute left-0 top-0 flex items-center gap-2 bg-ink px-3 py-1.5">
            <span className="display text-2xl leading-none text-paper">
              {dayNum(event.date)}
            </span>
            <span className="meta text-[0.6rem] uppercase leading-tight text-paper/80">
              {monthShort(event.date)}
            </span>
          </div>
          {rel && (
            <span className="absolute right-0 top-0 bg-chilli px-3 py-1.5 meta text-[0.6rem] font-bold uppercase tracking-[0.12em] text-paper">
              {rel}
            </span>
          )}
          {event.isSoldOut && (
            <span className="absolute bottom-0 left-0 bg-ink px-3 py-1.5 meta text-[0.6rem] font-bold uppercase tracking-[0.12em] text-paper">
              Sold Out
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-center justify-between meta text-[0.62rem] uppercase tracking-[0.14em] text-ink/60">
            <span>{categoryLabel(event.category)}</span>
            <span>{event.startTime ?? ""}</span>
          </div>
          <h3 className="display mt-2 text-2xl leading-[0.95] text-ink">
            {event.title}
          </h3>
          <div className="mt-auto flex items-center justify-between pt-4">
            <span className="meta text-[0.62rem] uppercase tracking-[0.12em] text-ink/60">
              {event.price ?? "Free entry"}
            </span>
            <span className="inline-flex items-center gap-1 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-chilli">
              {ctaLabel[event.cta]} <span aria-hidden>&#8599;</span>
            </span>
          </div>
        </div>
      </button>

      {/* Corner ticket notch */}
      <span className="pointer-events-none absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-paper" />
      <span className="pointer-events-none absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-paper" />

      {/* screen-reader date */}
      <span className="sr-only">{formatEventDate(event.date)}</span>
    </article>
  );
}

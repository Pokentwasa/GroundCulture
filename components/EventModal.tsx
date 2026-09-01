"use client";

import { useEffect, useRef } from "react";
import type { GcEvent } from "@/lib/types";
import { categoryLabel } from "@/data/events";
import { formatEventDate } from "@/lib/date";
import { site } from "@/lib/site";
import Media from "@/components/Media";

const ctaLabel: Record<string, string> = {
  tickets: "Buy Tickets",
  rsvp: "RSVP",
  details: "View Details",
};

export default function EventModal({
  event,
  onClose,
}: {
  event: GcEvent | null;
  onClose: () => void;
}) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!event) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const focusable = panel.current?.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    // Focus the panel's close button.
    requestAnimationFrame(() => {
      panel.current
        ?.querySelector<HTMLElement>("[data-autofocus]")
        ?.focus();
    });

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prevFocus?.focus();
    };
  }, [event, onClose]);

  if (!event) return null;

  const whatsappShare = `${site.contact.whatsapp}?text=${encodeURIComponent(
    `${event.title} at Ground Culture - ${formatEventDate(event.date)}. ${event.ticketUrl}`,
  )}`;

  return (
    <div
      className="fixed inset-0 z-[130] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={event.title}
    >
      <div
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        ref={panel}
        className="relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-y-auto bg-paper [box-shadow:10px_10px_0_0_var(--gc-chilli)] sm:max-h-[86vh] md:grid md:grid-cols-2 md:overflow-hidden"
      >
        {/* Artwork */}
        <div className="poster relative aspect-square w-full md:aspect-auto md:h-full">
          <Media src={event.image} alt={event.title} slot={`event-${event.slug}`} />
        </div>

        {/* Detail */}
        <div className="flex flex-col gap-5 overflow-y-auto p-6 md:p-8">
          <div className="flex items-start justify-between">
            <span className="meta text-[0.66rem] uppercase tracking-[0.16em] text-chilli">
              {categoryLabel(event.category)}
            </span>
            <button
              data-autofocus
              onClick={onClose}
              className="meta text-[0.7rem] font-bold uppercase tracking-[0.12em]"
              aria-label="Close"
            >
              Close &#215;
            </button>
          </div>

          <h2 className="display d-md text-ink">{event.title}</h2>

          <dl className="grid grid-cols-2 gap-4 border-y border-ink/15 py-4 text-sm">
            <div>
              <dt className="meta text-[0.6rem] uppercase tracking-[0.14em] text-ink/50">
                Date
              </dt>
              <dd className="font-semibold">{formatEventDate(event.date)}</dd>
            </div>
            <div>
              <dt className="meta text-[0.6rem] uppercase tracking-[0.14em] text-ink/50">
                Time
              </dt>
              <dd className="font-semibold">
                {event.doors ? `Doors ${event.doors} / ` : ""}
                {event.startTime ?? "TBC"}
              </dd>
            </div>
            <div>
              <dt className="meta text-[0.6rem] uppercase tracking-[0.14em] text-ink/50">
                Venue
              </dt>
              <dd className="font-semibold">{event.venue}</dd>
            </div>
            <div>
              <dt className="meta text-[0.6rem] uppercase tracking-[0.14em] text-ink/50">
                Price
              </dt>
              <dd className="font-semibold">{event.price ?? "Free entry"}</dd>
            </div>
          </dl>

          {event.description && (
            <p className="text-[0.95rem] leading-relaxed text-ink/80">
              {event.description}
            </p>
          )}
          {event.performer && (
            <p className="meta text-[0.68rem] uppercase tracking-[0.14em] text-ink/60">
              Line-up: {event.performer}
            </p>
          )}

          <div className="mt-auto flex flex-col gap-3 pt-2">
            <a
              href={event.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-chilli px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-paper transition-colors hover:bg-ink"
            >
              {ctaLabel[event.cta]} <span aria-hidden>&#8599;</span>
            </a>
            <div className="flex flex-wrap gap-3">
              <a
                href={site.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 border border-ink px-4 py-3 text-center text-[0.72rem] font-bold uppercase tracking-[0.1em] transition-colors hover:bg-ink hover:text-paper"
              >
                Get Directions
              </a>
              <a
                href={whatsappShare}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 border border-ink px-4 py-3 text-center text-[0.72rem] font-bold uppercase tracking-[0.1em] transition-colors hover:bg-ink hover:text-paper"
              >
                WhatsApp a Friend
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

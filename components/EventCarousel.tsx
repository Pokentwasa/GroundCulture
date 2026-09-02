"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { GcEvent } from "@/lib/types";
import { categoryLabel } from "@/data/events";
import { dayNum, monthShort, relativeDayLabel } from "@/lib/date";
import { cn } from "@/lib/utils";

const ctaLabel: Record<string, string> = {
  tickets: "Get Tickets",
  rsvp: "RSVP",
  details: "Details",
};

const categoryTint: Record<string, string> = {
  comedy: "from-chilli to-ink",
  music: "from-green-2 to-ink",
  quiz: "from-ink-2 to-ink",
  sport: "from-green to-ink",
  special: "from-chilli to-ink-2",
};

/** On-brand poster for events with no artwork yet. Never "image unavailable". */
function FallbackPoster({ event }: { event: GcEvent }) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-br p-5 text-paper",
        categoryTint[event.category] ?? "from-ink-2 to-ink",
      )}
    >
      <div className="pointer-events-none absolute inset-3 border border-paper/15" />
      <div className="relative flex items-start justify-between">
        <span className="meta text-[0.58rem] uppercase tracking-[0.2em] text-paper/70">
          Ground Culture
        </span>
        <span className="meta text-[0.58rem] uppercase tracking-[0.2em] text-paper/70">
          {categoryLabel(event.category)}
        </span>
      </div>
      <div className="relative">
        <span className="display block text-[3rem] leading-[0.85] text-paper">
          {dayNum(event.date)}
        </span>
        <span className="meta block text-xs uppercase tracking-[0.2em] text-paper/70">
          {monthShort(event.date)}
        </span>
        <h3 className="display mt-4 text-[1.8rem] leading-[0.92] text-paper">
          {event.title}
        </h3>
        <p className="meta mt-3 text-[0.6rem] uppercase tracking-[0.12em] text-paper/60">
          {event.venue}
        </p>
      </div>
    </div>
  );
}

export default function EventCarousel({ events }: { events: GcEvent[] }) {
  const n = events.length;
  // Three laps of the programme back to back, so there's always a real
  // poster peeking in on both sides - including at the very first/last
  // event - and navigation can just keep going past either end. Once
  // settled, we quietly re-centre into the middle lap (see settle logic
  // below) so this can repeat indefinitely without ever running out of
  // clones to scroll into.
  const loop = n > 1 ? [...events, ...events, ...events] : events;
  const initialIndex = n > 1 ? n : 0; // start of the middle lap (or the only card)

  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef(initialIndex);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [rel, setRel] = useState("");
  const settleTimer = useRef<ReturnType<typeof setTimeout>>();

  const active = loop[((activeIndex % loop.length) + loop.length) % loop.length] ?? events[0];

  useEffect(() => {
    setRel(active ? relativeDayLabel(active.date, new Date()) : "");
  }, [active]);

  // Continuous distance-from-centre -> scale/opacity, applied straight to
  // the DOM (no per-frame React state) so scrubbing stays smooth.
  const updateFrame = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const trackRect = track.getBoundingClientRect();
    const centerX = trackRect.left + trackRect.width / 2;
    const half = trackRect.width / 2 + 40;

    let closest = 0;
    let closestDist = Infinity;

    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cardCenter = r.left + r.width / 2;
      const dist = Math.abs(cardCenter - centerX);
      const norm = Math.min(dist / half, 1);
      const scale = 1 - norm * 0.5;
      const opacity = 1 - norm * 0.55;
      el.style.setProperty("--scale", scale.toFixed(3));
      el.style.setProperty("--op", opacity.toFixed(3));
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });

    if (closest !== activeIndexRef.current) {
      activeIndexRef.current = closest;
      setActiveIndex(closest);
    }
    return closest;
  }, []);

  // Scrolls only the track's own horizontal axis. el.scrollIntoView()
  // looks equivalent but walks every scrollable ancestor including the
  // page itself - with block:"nearest" it still yanked the whole window
  // down to this section on first mount, since the card wasn't yet
  // vertically in view. Computing the offset directly keeps this
  // strictly local to the carousel.
  const scrollToIndex = useCallback((i: number, behavior: ScrollBehavior = "smooth") => {
    const track = trackRef.current;
    const el = cardRefs.current[i];
    if (!track || !el) return;
    const target = el.offsetLeft - (track.clientWidth - el.clientWidth) / 2;
    track.scrollTo({ left: target, behavior });
  }, []);

  // Once scrolling has settled, if we've drifted into the first or third
  // lap (from repeated wheel/drag/arrow travel), silently re-centre into
  // the equivalent card in the middle lap - instantly, no animation, and
  // only after the fact, so it's invisible: the clone and the real card
  // it's swapped for render identically.
  const resettleIfNeeded = useCallback(() => {
    if (n <= 1) return;
    const idx = activeIndexRef.current;
    if (idx >= n && idx < 2 * n) return; // already in the middle lap
    const target = n + (((idx % n) + n) % n);
    scrollToIndex(target, "auto");
    activeIndexRef.current = target;
    setActiveIndex(target);
  }, [n, scrollToIndex]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateFrame();
        ticking = false;
      });
      clearTimeout(settleTimer.current);
      settleTimer.current = setTimeout(resettleIfNeeded, 160);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearTimeout(settleTimer.current);
    };
  }, [updateFrame, resettleIfNeeded]);

  // Reset to the middle lap's first poster whenever the event list itself
  // changes (e.g. a filter switch), so stale scroll position never lingers.
  // cardRefs is intentionally left alone: React's ref callbacks keep each
  // index in sync as cards mount/unmount, so clearing it here would only
  // wipe out refs the initial render just attached.
  const eventsKey = events.map((e) => e.slug).join("|");
  useEffect(() => {
    activeIndexRef.current = initialIndex;
    setActiveIndex(initialIndex);
    requestAnimationFrame(() => {
      scrollToIndex(initialIndex, "auto");
      updateFrame();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventsKey]);

  // Convert a mostly-vertical wheel gesture into horizontal motion. No
  // start/end bail-out needed any more - the rail always has more lap to
  // scroll into.
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
    e.preventDefault();
    track.scrollLeft += e.deltaY;
  };

  // Pointer drag-to-scroll (touch/trackpad already scroll natively).
  const drag = useRef({ down: false, startX: 0, scroll: 0, moved: false });
  const onDown = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current = { down: true, startX: e.clientX, scroll: el.scrollLeft, moved: false };
    el.classList.add("grabbing");
  };
  const onMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.scroll - dx;
  };
  const onUp = () => {
    drag.current.down = false;
    trackRef.current?.classList.remove("grabbing");
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollToIndex(activeIndex + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollToIndex(activeIndex - 1);
    }
  };

  if (events.length === 0) return null;

  return (
    <div className="relative">
      <div
        ref={trackRef}
        role="region"
        aria-label="Upcoming events"
        tabIndex={0}
        onWheel={onWheel}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        onKeyDown={onKeyDown}
        style={{ ["--stage-w" as string]: "clamp(320px, 44vw, 480px)" }}
        className="no-bar grab flex touch-pan-y snap-x snap-mandatory items-center gap-x-6 overflow-x-auto py-10 select-none focus:outline-none md:gap-x-10"
      >
        <div
          aria-hidden
          className="shrink-0"
          style={{ width: "calc(50% - var(--stage-w) / 2)" }}
        />

        {loop.map((event, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={`${event.slug}-${i}`}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="poster relative shrink-0 snap-center [aspect-ratio:2/3] [box-shadow:6px_6px_0_0_var(--gc-ink)] transition-shadow duration-300"
              style={{
                width: "var(--stage-w)",
                transform: "scale(var(--scale, 1))",
                opacity: "var(--op, 1)",
                zIndex: isActive ? 20 : 10,
              }}
            >
              <button
                onClick={() => {
                  if (drag.current.moved) return;
                  if (!isActive) scrollToIndex(i);
                }}
                aria-current={isActive}
                aria-label={event.title}
                className="block h-full w-full"
              >
                {event.image ? (
                  <img
                    src={event.image}
                    alt={event.title}
                    loading={Math.abs(i - n) < 3 ? "eager" : "lazy"}
                    decoding="async"
                    className="h-full w-full bg-ink object-contain"
                  />
                ) : (
                  <FallbackPoster event={event} />
                )}
                {event.isSoldOut && (
                  <span className="absolute bottom-0 left-0 bg-ink px-3 py-1.5 meta text-[0.6rem] font-bold uppercase tracking-[0.12em] text-paper">
                    Sold Out
                  </span>
                )}
              </button>
            </div>
          );
        })}

        <div
          aria-hidden
          className="shrink-0"
          style={{ width: "calc(50% - var(--stage-w) / 2)" }}
        />
      </div>

      {/* Arrows (desktop) - always active, the rail loops both ways. */}
      <button
        aria-label="Previous event"
        onClick={() => scrollToIndex(activeIndex - 1)}
        className="absolute left-2 top-1/2 z-30 hidden -translate-y-1/2 items-center justify-center border border-ink/25 bg-paper/80 p-3 backdrop-blur transition-opacity hover:border-ink md:flex"
      >
        &#8592;
      </button>
      <button
        aria-label="Next event"
        onClick={() => scrollToIndex(activeIndex + 1)}
        className="absolute right-2 top-1/2 z-30 hidden -translate-y-1/2 items-center justify-center border border-ink/25 bg-paper/80 p-3 backdrop-blur transition-opacity hover:border-ink md:flex"
      >
        &#8594;
      </button>

      {/* Active event metadata */}
      <div key={active.slug} className="u-container mt-2 animate-[gc-fade-up_0.4s_ease-out]">
        <div className="flex flex-col gap-4 border-t border-ink/15 pt-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 meta text-[0.65rem] uppercase tracking-[0.14em] text-ink/60">
              <span className="text-chilli">{rel || dayNum(active.date) + " " + monthShort(active.date)}</span>
              <span>&#183;</span>
              <span>{categoryLabel(active.category)}</span>
              {active.startTime && (
                <>
                  <span>&#183;</span>
                  <span>{active.startTime}</span>
                </>
              )}
            </div>
            <h3 className="display d-md mt-2 text-ink">{active.title}</h3>
            <p className="meta mt-2 text-[0.7rem] uppercase tracking-[0.12em] text-ink/60">
              {active.venue} &#183; {active.price ?? "Free entry"}
            </p>
          </div>
          <a
            href={active.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor={ctaLabel[active.cta]}
            className="inline-flex shrink-0 items-center justify-center gap-2 bg-chilli px-6 py-4 text-sm font-bold uppercase tracking-[0.12em] text-paper transition-colors hover:bg-ink"
          >
            {ctaLabel[active.cta]} <span aria-hidden>&#8599;</span>
          </a>
        </div>
        <div className="mt-3 meta text-[0.6rem] uppercase tracking-[0.14em] text-ink/40">
          {String((((activeIndex % n) + n) % n) + 1).padStart(2, "0")} &#8213; {String(n).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}

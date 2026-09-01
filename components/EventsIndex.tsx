"use client";

import { useMemo, useState } from "react";
import type { GcEvent, EventCategory } from "@/lib/types";
import { sortedEvents, categoryLabel } from "@/data/events";
import EventPoster from "@/components/EventPoster";
import EventModal from "@/components/EventModal";
import { cn } from "@/lib/utils";

type Filter = "all" | EventCategory;

export default function EventsIndex() {
  const all = useMemo(() => sortedEvents(), []);
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<GcEvent | null>(null);

  const filters = useMemo(() => {
    const cats = Array.from(new Set(all.map((e) => e.category)));
    return ["all", ...cats] as Filter[];
  }, [all]);

  const visible = useMemo(
    () => (filter === "all" ? all : all.filter((e) => e.category === filter)),
    [all, filter],
  );

  return (
    <div className="u-container mt-10 pb-24">
      <div className="no-bar flex gap-2 overflow-x-auto pb-1">
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

      {visible.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((e) => (
            <EventPoster key={e.slug} event={e} onOpen={setActive} fill />
          ))}
        </div>
      ) : (
        <div className="mt-12 border border-ink/20 p-10 text-center">
          <h2 className="display d-md text-ink">
            Nothing here.
            <br />
            Yet.
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-sm text-ink/70">
            Try another category, or follow @groundculture_ for the next drop.
          </p>
        </div>
      )}

      <EventModal event={active} onClose={() => setActive(null)} />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { locations, getLocation } from "@/data/locations";
import { sortedEvents } from "@/data/events";
import { formatEventDate } from "@/lib/date";
import { site } from "@/lib/site";
import Media from "@/components/Media";
import ArrowLink from "@/components/ArrowLink";
import JsonLd from "@/components/JsonLd";
import { locationSchema } from "@/lib/jsonld";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const l = getLocation(params.slug);
  if (!l) return { title: "Location not found" };
  const title = `${l.name} \u2014 Ground Culture`;
  return {
    title,
    description: l.description,
    alternates: { canonical: `/locations/${l.slug}` },
    openGraph: { title, description: l.description, images: l.image ? [l.image] : undefined },
  };
}

export default function LocationDetail({
  params,
}: {
  params: { slug: string };
}) {
  const l = getLocation(params.slug);
  if (!l) notFound();

  // HQ shows the live programme (events mapped to Observatory).
  const events = l.isHq
    ? sortedEvents()
        .filter((e) => e.location === l.slug)
        .slice(0, 4)
    : [];

  return (
    <>
      <JsonLd data={locationSchema(l)} />

      {/* Hero */}
      <header className="u-container pt-32 md:pt-40">
        <Link
          href="/locations"
          className="link-wipe meta text-[0.7rem] uppercase tracking-[0.14em] text-ink/60"
        >
          &#8592; All locations
        </Link>
        <div className="mt-6 flex flex-col gap-2">
          <span className="section-index text-ink/60">
            {l.neighbourhood} <span className="text-chilli">/</span>{" "}
            {l.type === "cafe-venue" ? "Cafe & Comedy Club" : "Food Truck"}
          </span>
          <h1 className="display d-mega text-ink">{l.name}</h1>
          <p className="meta text-[0.72rem] uppercase tracking-[0.16em] text-chilli">
            {l.tagline}
          </p>
        </div>
      </header>

      <div className="u-container mt-10 grid gap-10 pb-24 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <div className="poster relative aspect-[16/10] w-full overflow-hidden [box-shadow:8px_8px_0_0_var(--gc-green)]">
            <Media src={l.image} alt={l.name} slot={`location-${l.slug}`} eager />
          </div>
          <p className="mt-6 max-w-prose text-base leading-relaxed text-ink/80">
            {l.description}
          </p>

          {/* Day/Night note for HQ */}
          {l.isHq && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="border border-ink/15 p-5">
                <span className="meta text-[0.6rem] uppercase tracking-[0.14em] text-ink/50">
                  Day
                </span>
                <p className="display mt-2 text-2xl text-ink">Cafe</p>
                <p className="mt-1 text-sm text-ink/70">
                  Coffee, breakfast, lunch. Laptop-friendly, free Wi-Fi.
                </p>
              </div>
              <div className="border border-ink bg-ink p-5 text-paper">
                <span className="meta text-[0.6rem] uppercase tracking-[0.14em] text-paper/60">
                  Night
                </span>
                <p className="display mt-2 text-2xl">Comedy Club</p>
                <p className="mt-1 text-sm text-paper/70">
                  Comedy, live music, quiz nights and shows.
                </p>
              </div>
            </div>
          )}

          {/* What's on here */}
          {events.length > 0 && (
            <div className="mt-10">
              <h2 className="display d-md text-ink">What&#39;s on here</h2>
              <ul className="mt-5 divide-y divide-ink/10 border-y border-ink/15">
                {events.map((e) => (
                  <li key={e.slug}>
                    <Link
                      href={`/events/${e.slug}`}
                      className="group flex items-center justify-between gap-4 py-4"
                    >
                      <div>
                        <span className="meta text-[0.62rem] uppercase tracking-[0.12em] text-chilli">
                          {formatEventDate(e.date)}
                        </span>
                        <p className="display text-xl text-ink">{e.title}</p>
                      </div>
                      <span
                        aria-hidden
                        className="text-ink/50 transition-transform group-hover:translate-x-1"
                      >
                        &#8599;
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <ArrowLink href="/events" variant="text">
                  See the full programme
                </ArrowLink>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: services, hours, actions */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="border border-ink/15 p-6">
            <span className="meta text-[0.6rem] uppercase tracking-[0.14em] text-ink/50">
              What&#39;s here
            </span>
            <div className="mt-3 flex flex-wrap gap-2">
              {l.services.map((s) => (
                <span
                  key={s}
                  className="border border-ink/25 px-3 py-1 meta text-[0.6rem] uppercase tracking-[0.1em] text-ink/70"
                >
                  {s}
                </span>
              ))}
            </div>

            {l.address && (
              <p className="mt-6 text-sm text-ink/80">{l.address}</p>
            )}

            {l.hours && (
              <div className="mt-6">
                <span className="meta text-[0.6rem] uppercase tracking-[0.14em] text-ink/50">
                  Hours
                </span>
                <dl className="mt-2 space-y-1 text-sm">
                  {l.hours.map((h) => (
                    <div key={h.day} className="flex justify-between gap-4">
                      <dt className="text-ink/60">{h.day}</dt>
                      <dd className="text-right font-medium">{h.hours}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3">
              {l.directionsUrl && (
                <a
                  href={l.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-ink px-6 py-4 text-sm font-bold uppercase tracking-[0.1em] text-paper transition-colors hover:bg-chilli"
                >
                  Get Directions <span aria-hidden>&#8599;</span>
                </a>
              )}
              {l.orderUrl && (
                <a
                  href={l.orderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-ink px-6 py-4 text-sm font-bold uppercase tracking-[0.1em] transition-colors hover:bg-ink hover:text-paper"
                >
                  Order on Uber Eats
                </a>
              )}
              <a
                href={site.contact.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-ink px-6 py-4 text-sm font-bold uppercase tracking-[0.1em] transition-colors hover:bg-ink hover:text-paper"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

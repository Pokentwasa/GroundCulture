import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { events, getEvent, categoryLabel } from "@/data/events";
import { formatEventDate } from "@/lib/date";
import { site } from "@/lib/site";
import Media from "@/components/Media";
import JsonLd from "@/components/JsonLd";
import { eventSchema } from "@/lib/jsonld";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const e = getEvent(params.slug);
  if (!e) return { title: "Event not found" };
  return {
    title: e.title,
    description: e.description ?? `${e.title} at Ground Culture, Observatory.`,
    alternates: { canonical: `/events/${e.slug}` },
    openGraph: {
      title: e.title,
      description: e.description,
      images: e.image ? [e.image] : undefined,
    },
  };
}

const ctaLabel: Record<string, string> = {
  tickets: "Buy Tickets",
  rsvp: "RSVP",
  details: "View Details",
};

export default function EventDetail({
  params,
}: {
  params: { slug: string };
}) {
  const e = getEvent(params.slug);
  if (!e) notFound();

  const whatsappShare = `${site.contact.whatsapp}?text=${encodeURIComponent(
    `${e.title} at Ground Culture - ${formatEventDate(e.date)}. ${e.ticketUrl}`,
  )}`;

  return (
    <>
      <JsonLd data={eventSchema(e)} />
      <article className="u-container grid gap-10 pb-24 pt-32 md:pt-40 lg:grid-cols-2 lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="poster relative aspect-[4/5] w-full overflow-hidden [box-shadow:10px_10px_0_0_var(--gc-chilli)]">
            <Media src={e.image} alt={e.title} slot={`event-${e.slug}`} eager />
          </div>
        </div>

        <div>
          <Link
            href="/events"
            className="link-wipe meta text-[0.7rem] uppercase tracking-[0.14em] text-ink/60"
          >
            &#8592; All events
          </Link>
          <span className="mt-6 block meta text-[0.68rem] uppercase tracking-[0.16em] text-chilli">
            {categoryLabel(e.category)}
          </span>
          <h1 className="display d-lg mt-3 text-ink">{e.title}</h1>

          <dl className="mt-8 grid grid-cols-2 gap-5 border-y border-ink/15 py-6 text-sm">
            <div>
              <dt className="meta text-[0.6rem] uppercase tracking-[0.14em] text-ink/50">
                Date
              </dt>
              <dd className="mt-1 font-semibold">{formatEventDate(e.date)}</dd>
            </div>
            <div>
              <dt className="meta text-[0.6rem] uppercase tracking-[0.14em] text-ink/50">
                Time
              </dt>
              <dd className="mt-1 font-semibold">
                {e.doors ? `Doors ${e.doors} / ` : ""}
                {e.startTime ?? "TBC"}
              </dd>
            </div>
            <div>
              <dt className="meta text-[0.6rem] uppercase tracking-[0.14em] text-ink/50">
                Venue
              </dt>
              <dd className="mt-1 font-semibold">{e.venue}</dd>
            </div>
            <div>
              <dt className="meta text-[0.6rem] uppercase tracking-[0.14em] text-ink/50">
                Price
              </dt>
              <dd className="mt-1 font-semibold">{e.price ?? "Free entry"}</dd>
            </div>
          </dl>

          {e.description && (
            <p className="mt-6 max-w-prose leading-relaxed text-ink/80">
              {e.description}
            </p>
          )}
          {e.performer && (
            <p className="mt-4 meta text-[0.68rem] uppercase tracking-[0.14em] text-ink/60">
              Line-up: {e.performer}
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={e.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-chilli px-7 py-4 text-sm font-bold uppercase tracking-[0.12em] text-paper transition-colors hover:bg-ink"
            >
              {ctaLabel[e.cta]} <span aria-hidden>&#8599;</span>
            </a>
            <a
              href={site.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-ink px-7 py-4 text-sm font-bold uppercase tracking-[0.12em] transition-colors hover:bg-ink hover:text-paper"
            >
              Get Directions
            </a>
            <a
              href={whatsappShare}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-ink px-7 py-4 text-sm font-bold uppercase tracking-[0.12em] transition-colors hover:bg-ink hover:text-paper"
            >
              WhatsApp a Friend
            </a>
          </div>
        </div>
      </article>
    </>
  );
}

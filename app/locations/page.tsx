import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Media from "@/components/Media";
import { locations } from "@/data/locations";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Ground Culture across Cape Town: the Observatory cafe & comedy club plus food trucks in Blouberg, Sea Point, Claremont and Prom Park.",
  alternates: { canonical: "/locations" },
};

export default function LocationsPage() {
  return (
    <>
      <PageHeader
        index="03"
        eyebrow="Find us"
        title={
          <>
            One culture. Different
            <br />
            corners of Cape Town.
          </>
        }
        lead="The Observatory cafe is the mothership: coffee by day, comedy club by night. The trucks bring the same smash burgers to the coast and the suburbs."
      />

      <div className="u-container mt-12 grid gap-6 pb-24 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((l, i) => (
          <Link
            key={l.slug}
            href={`/locations/${l.slug}`}
            data-cursor="Explore"
            className="group flex flex-col border border-ink/15 transition-colors hover:border-ink"
          >
            <div className="poster relative aspect-[4/3] w-full overflow-hidden">
              <Media
                src={l.image}
                alt={l.name}
                slot={`location-${l.slug}`}
                imgClassName="transition-transform duration-500 group-hover:scale-[1.04]"
              />
              <span className="absolute left-0 top-0 bg-ink px-3 py-1.5 meta text-[0.6rem] uppercase tracking-[0.12em] text-paper">
                0{i + 1}
              </span>
              {l.isHq && (
                <span className="absolute right-0 top-0 bg-chilli px-3 py-1.5 meta text-[0.58rem] font-bold uppercase tracking-[0.12em] text-paper">
                  HQ
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-baseline justify-between">
                <h2 className="display text-3xl text-ink">{l.name}</h2>
                <span aria-hidden className="text-ink/50 transition-transform group-hover:translate-x-1">
                  &#8599;
                </span>
              </div>
              <p className="meta mt-1 text-[0.62rem] uppercase tracking-[0.12em] text-chilli">
                {l.tagline}
              </p>
              <p className="mt-3 text-sm text-ink/70">{l.description}</p>
              <div className="mt-auto flex flex-wrap gap-2 pt-4">
                {l.services.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="border border-ink/20 px-2 py-0.5 meta text-[0.56rem] uppercase tracking-[0.1em] text-ink/60"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

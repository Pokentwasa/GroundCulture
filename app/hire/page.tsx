import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Hire",
  description:
    "Hire the Ground Culture food truck for your event, or hire the Observatory venue for comedy, launches, birthdays and private events in Cape Town.",
  alternates: { canonical: "/hire" },
};

const options = [
  {
    idx: "01",
    kind: "Food Truck Hire",
    title: ["Bring us", "to you."],
    href: "/hire/food-truck",
    cta: "Hire the Truck",
    tone: "ink",
  },
  {
    idx: "02",
    kind: "Venue Hire",
    title: ["Bring your", "people to us."],
    href: "/hire/venue",
    cta: "Hire the Venue",
    tone: "chilli",
  },
];

export default function HirePage() {
  return (
    <>
      <PageHeader
        index="05"
        eyebrow="Hire"
        title={
          <>
            Make Ground Culture
            <br />
            yours for the day.
          </>
        }
        lead="Two ways to work with us. Bring the truck to your event, or bring your people to the room in Observatory."
      />

      <div className="u-container mt-12 grid gap-5 pb-24 md:grid-cols-2">
        {options.map((o) => (
          <Link
            key={o.idx}
            href={o.href}
            data-cursor="Enquire"
            className={`group flex min-h-[24rem] flex-col justify-between p-8 text-paper transition-transform duration-300 hover:-translate-y-1 md:min-h-[30rem] ${
              o.tone === "chilli" ? "bg-chilli" : "bg-ink"
            }`}
          >
            <div className="flex items-center justify-between meta text-[0.66rem] uppercase tracking-[0.14em] text-paper/70">
              <span>{o.idx}</span>
              <span>{o.kind}</span>
            </div>
            <h2 className="display d-lg">
              {o.title.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h2>
            <span className="inline-flex items-center gap-2 border-b-2 border-paper pb-1 text-sm font-bold uppercase tracking-[0.1em]">
              {o.cta}
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                &#8599;
              </span>
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}

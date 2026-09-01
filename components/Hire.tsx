import Link from "next/link";

const options = [
  {
    idx: "01",
    kind: "Food Truck Hire",
    title: ["Bring us", "to you."],
    uses: ["Corporate events", "Private parties", "Markets", "Festivals", "Celebrations"],
    href: "/hire/food-truck",
    cta: "Hire the Truck",
    tone: "ink" as const,
  },
  {
    idx: "02",
    kind: "Venue Hire",
    title: ["Bring your", "people to us."],
    uses: ["Comedy", "Launches", "Birthdays", "Private events", "Shows", "Community gatherings"],
    href: "/hire/venue",
    cta: "Hire the Venue",
    tone: "chilli" as const,
  },
];

export default function Hire() {
  return (
    <section className="bg-paper py-16 md:py-28">
      <div className="u-container">
        <span className="section-index text-ink/60">
          09 / <span className="text-chilli">Hire</span>
        </span>
        <h2 className="display d-xl mt-3 max-w-4xl text-ink">
          Make Ground Culture
          <br />
          yours for the day.
        </h2>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {options.map((o) => (
            <Link
              key={o.idx}
              href={o.href}
              data-cursor="Enquire"
              className={`group relative flex min-h-[22rem] flex-col justify-between overflow-hidden p-7 transition-colors md:min-h-[26rem] ${
                o.tone === "chilli"
                  ? "bg-chilli text-paper"
                  : "bg-ink text-paper"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="meta text-xs uppercase tracking-[0.16em] text-paper/70">
                  {o.idx}
                </span>
                <span className="meta text-[0.66rem] uppercase tracking-[0.14em] text-paper/70">
                  {o.kind}
                </span>
              </div>

              <h3 className="display d-lg text-paper">
                {o.title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h3>

              <div>
                <ul className="mb-6 flex flex-wrap gap-x-4 gap-y-1 text-[0.8rem] font-semibold uppercase tracking-[0.06em] text-paper/70">
                  {o.uses.map((u) => (
                    <li key={u}>{u}</li>
                  ))}
                </ul>
                <span className="inline-flex items-center gap-2 border-b-2 border-paper pb-1 text-sm font-bold uppercase tracking-[0.1em]">
                  {o.cta}
                  <span
                    aria-hidden
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    &#8599;
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

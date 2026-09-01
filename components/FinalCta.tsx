import Link from "next/link";
import { site } from "@/lib/site";

const actions = [
  { label: "Eat", href: "/menu" },
  { label: "Watch", href: "/events" },
  { label: "Order", href: site.ordering.uberEats, external: true },
  { label: "Visit", href: "/locations" },
  { label: "Hire", href: "/hire" },
];

export default function FinalCta() {
  return (
    <section className="bg-paper-2 py-20 md:py-32">
      <div className="u-container text-center">
        <h2 className="display d-mega text-ink">
          Come
          <br />
          through.
        </h2>

        <p className="meta mx-auto mt-6 max-w-xs text-[0.72rem] uppercase tracking-[0.16em] text-ink/60">
          What are you here for?
        </p>

        <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {actions.map((a) =>
            a.external ? (
              <li key={a.label}>
                <a
                  href={a.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor={a.label}
                  className="display text-5xl text-ink transition-colors duration-200 hover:text-chilli md:text-7xl"
                >
                  {a.label}
                </a>
              </li>
            ) : (
              <li key={a.label}>
                <Link
                  href={a.href}
                  data-cursor={a.label}
                  className="display text-5xl text-ink transition-colors duration-200 hover:text-chilli md:text-7xl"
                >
                  {a.label}
                </Link>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}

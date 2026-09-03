import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import ArrowLink from "@/components/ArrowLink";
import { site } from "@/lib/site";
import { menuIntro } from "@/data/menu";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Smash burgers made in-house daily from local Halaal butchers, plus breakfast, coffee and cocktails at Ground Culture Cafe, Observatory. Order in store or on Uber Eats.",
  alternates: { canonical: "/menu" },
};

const WIX = "https://static.wixstatic.com/media";
// The live menu is published as image cards; these are the real ones.
const menuCards = [
  {
    title: "Breakfast & Lunch",
    src: `${WIX}/207811_04d90ed2e75b43088633335552d2f0d4~mv2.png/v1/fill/w_700,h_990,al_c,q_85,enc_avif,quality_auto/Breakfast%20%26%20Lunch.png`,
  },
  {
    title: "Starters & Burgers",
    src: `${WIX}/207811_1a3de1537c56420a8789ea811a961c1f~mv2.png/v1/fill/w_700,h_990,al_c,q_85,enc_avif,quality_auto/Starters%20%26%20Burgers.png`,
  },
  {
    title: "Non-Alcoholic",
    src: `${WIX}/207811_50c17f85cb984589a6d891b83ad98731~mv2.png/v1/fill/w_700,h_990,al_c,q_85,enc_avif,quality_auto/Non-Alcoholic%20Beverages.png`,
  },
  {
    title: "Cocktails",
    src: `${WIX}/207811_feee2bcf1df14f92b4aafb07892af7a4~mv2.png/v1/fill/w_700,h_1035,al_c,q_85,enc_avif,quality_auto/Cocktails%20.png`,
  },
];

export default function MenuPage() {
  return (
    <>
      <PageHeader
        index="02"
        eyebrow="Eat"
        title={
          <>
            Burgers with
            <br />
            something to say.
          </>
        }
        lead={menuIntro}
      />

      <div className="u-container mt-10 flex flex-wrap gap-3">
        <ArrowLink
          href={site.contact.whatsappOrder}
          external
          variant="block"
          tone="green"
        >
          Order on WhatsApp
        </ArrowLink>
        <ArrowLink
          href={site.ordering.uberEats}
          external
          variant="block"
          tone="chilli"
        >
          Uber Eats
        </ArrowLink>
      </div>

      {/* Real menu cards */}
      <div className="u-container mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {menuCards.map((c, i) => (
          <figure key={c.title} className="group">
            <div className="poster relative aspect-[5/7] w-full overflow-hidden [box-shadow:6px_6px_0_0_var(--gc-ink)]">
              <Image
                src={c.src}
                alt={`${c.title} menu`}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                priority={i === 0}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <figcaption className="meta mt-3 text-[0.66rem] uppercase tracking-[0.14em] text-ink/60">
              {c.title}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Closing statement */}
      <div className="u-container mt-20 border-t border-ink/15 pb-24 pt-10 text-center">
        <h2 className="display d-lg mx-auto max-w-2xl text-ink">
          Smashed daily.
          <br />
          Served proudly.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink/70">
          Full prices are on the cards above &mdash; come see us in Observatory,
          or get it delivered.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ArrowLink
            href={site.contact.whatsappOrder}
            external
            variant="block"
            tone="green"
          >
            Order on WhatsApp
          </ArrowLink>
          <ArrowLink
            href={site.ordering.uberEats}
            external
            variant="block"
            tone="chilli"
          >
            Uber Eats
          </ArrowLink>
        </div>
      </div>
    </>
  );
}

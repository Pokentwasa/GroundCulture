import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ArrowLink from "@/components/ArrowLink";
import Media from "@/components/Media";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Ground Culture unites and empowers South Africans through platforms for creativity, community and entrepreneurship. Cafe by day, comedy club by night, chef-run food trucks across Cape Town.",
  alternates: { canonical: "/about" },
};

const WIX = "https://static.wixstatic.com/media";
const img1 = `${WIX}/207811_4c352a2058094b45805ce03d1b56f78d~mv2.jpg/v1/fill/w_1000,h_800,al_c,q_85,enc_avif,quality_auto/207811_4c352a2058094b45805ce03d1b56f78d~mv2.jpg`;

const values = [
  {
    t: "Creativity",
    d: "A stage for chefs, comedians, musicians and makers to test, grow and be seen.",
  },
  {
    t: "Community",
    d: "A room where Cape Town shows up, sits together and connects over food and a laugh.",
  },
  {
    t: "Entrepreneurship",
    d: "The food-truck model turns culinary talent into thriving, owner-run enterprises.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        index="04"
        eyebrow="The story"
        title={
          <>
            How we
            <br />
            got here.
          </>
        }
        lead="Ground Culture exists to unite and empower South Africans through platforms that celebrate creativity, community and entrepreneurship. It started with a room in Observatory."
      />

      <section className="u-container mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="poster relative aspect-[5/4] w-full overflow-hidden [box-shadow:8px_8px_0_0_var(--gc-chilli)]">
          <Media src={img1} alt="Ground Culture" slot="about-room" />
        </div>
        <div className="space-y-5 text-ink/80">
          <p className="leading-relaxed">
            By day it&#39;s a coffee shop on Lower Main Road. By night it became
            South Africa&#39;s fastest-growing comedy club, hosting the likes of
            Riaad Moosa, Nina Hastie and Rob Van Vuuren alongside weekly
            comedy, live music and quiz nights.
          </p>
          <p className="leading-relaxed">
            The food-truck side of the business champions chefs, giving them the
            chance to sharpen their craft and step into business ownership. We
            nurture culinary talent and turn passion into thriving enterprises,
            parked across Cape Town.
          </p>
          <p className="leading-relaxed">
            Together, that&#39;s the point: a grounded culture of growth,
            connection and empowerment.
          </p>
        </div>
      </section>

      <section className="u-container mt-20">
        <h2 className="display d-md text-ink">What we&#39;re about</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <div key={v.t} className="border-t-2 border-ink pt-4">
              <span className="meta text-[0.62rem] uppercase tracking-[0.14em] text-chilli">
                0{i + 1}
              </span>
              <h3 className="display mt-2 text-3xl text-ink">{v.t}</h3>
              <p className="mt-3 text-sm text-ink/70">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="u-container mt-20 pb-24">
        <div className="flex flex-col items-start gap-6 bg-ink p-8 text-paper md:flex-row md:items-center md:justify-between md:p-12">
          <h2 className="display d-md">
            Come see
            <br />
            what we mean.
          </h2>
          <div className="flex flex-wrap gap-3">
            <ArrowLink href="/events" variant="block" tone="chilli">
              What&#39;s On
            </ArrowLink>
            <ArrowLink href="/locations" variant="block" tone="paper">
              Find Us
            </ArrowLink>
          </div>
        </div>
      </section>
    </>
  );
}

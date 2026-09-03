import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import ArrowLink from "@/components/ArrowLink";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Nights, crowds, food and stages at Ground Culture, Observatory. A cultural archive from Cape Town's fastest-growing comedy club.",
  alternates: { canonical: "/gallery" },
};

const WIX = "https://static.wixstatic.com/media";
const fit = (id: string, ext = "jpg") =>
  `${WIX}/${id}~mv2.${ext}/v1/fill/w_700,h_700,al_c,q_85,enc_avif,quality_auto/${id}~mv2.${ext}`;

// A contact-sheet mix from the real brand library. `span` makes the grid
// deliberately irregular.
const shots: { src: string; span: string }[] = [
  { src: fit("207811_22ba6416bbaf403db2092c3597e33571"), span: "row-span-2" },
  { src: fit("207811_5c3174f8ccdb44588d965f345f0417da"), span: "" },
  { src: fit("207811_a3f8f4b48c88449d917f902eedcd787b"), span: "col-span-2" },
  { src: fit("207811_0d2d676b904c42e8b93d1aa812093d6b"), span: "" },
  { src: fit("207811_dbdecfadf1434e519714514f113d81ca"), span: "row-span-2" },
  { src: fit("207811_7389cdd01ad2428ba31e3afcf7cf535e"), span: "" },
  { src: fit("207811_c0ce722265d741f188dcb9c2f8767433"), span: "" },
  { src: fit("207811_cf6ac56c93ba4225a9c8524ebda30ae6"), span: "col-span-2" },
  { src: fit("207811_eb991f1432204eeba08c16c1cdf6d74f"), span: "" },
  { src: fit("207811_3e16ae907655496ab224262d5cd24e4a"), span: "" },
  { src: fit("207811_bd18af87146a4b93b8ccca11607cd184"), span: "" },
  { src: fit("207811_8a47bbf5e9b74520b3df18605385b956"), span: "" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        index="06"
        eyebrow="The archive"
        title={
          <>
            You had
            <br />
            to be there.
          </>
        }
        lead="Nights, crowds, food and stages. The moments that made it. See more of what we've been up to on Instagram."
      />

      <div className="u-container mt-12 grid auto-rows-[42vw] grid-cols-2 gap-3 sm:auto-rows-[24vw] md:auto-rows-[18vw] md:grid-cols-4">
        {shots.map((s, i) => (
          <figure
            key={i}
            className={`poster group relative overflow-hidden [box-shadow:4px_4px_0_0_var(--gc-ink)] ${s.span}`}
          >
            <Image
              src={s.src}
              alt="Ground Culture, Observatory"
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <figcaption className="absolute bottom-0 left-0 translate-y-full bg-ink px-2 py-1 meta text-[0.54rem] uppercase tracking-[0.12em] text-paper transition-transform duration-300 group-hover:translate-y-0">
              Observatory
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="u-container mt-12 flex justify-center pb-24">
        <ArrowLink href={site.social.instagram} external variant="block" tone="chilli">
          See What We&#39;ve Been Up To
        </ArrowLink>
      </div>
    </>
  );
}

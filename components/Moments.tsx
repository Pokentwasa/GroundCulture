import ArrowLink from "@/components/ArrowLink";

const WIX = "https://static.wixstatic.com/media";
const fit = (id: string, w: number, h: number, ext = "jpg") =>
  `${WIX}/${id}~mv2.${ext}/v1/fill/w_${w},h_${h},al_c,q_85,enc_avif,quality_auto/${id}~mv2.${ext}`;

const shots = [
  {
    src: fit("207811_ce373a3a130b41b8a9a1d6707327c2a2", 700, 933, "jpeg"),
    rotate: "-rotate-2",
    span: "lg:col-span-4 lg:row-span-2",
  },
  {
    src: fit("207811_cf6ac56c93ba4225a9c8524ebda30ae6", 900, 600),
    rotate: "rotate-1",
    span: "lg:col-span-5",
  },
  {
    src: fit("207811_5c3174f8ccdb44588d965f345f0417da", 700, 700),
    rotate: "rotate-2",
    span: "lg:col-span-3",
  },
  {
    src: fit("207811_a3f8f4b48c88449d917f902eedcd787b", 900, 600),
    rotate: "-rotate-1",
    span: "lg:col-span-5",
  },
];

// A short, image-led beat between the story and the locations - pulled
// out of the hero collage so the photos get room to actually be seen.
export default function Moments() {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="u-container">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="display d-lg text-ink">
            Moments,
            <br />
            not just a menu.
          </h2>
          <ArrowLink href="/gallery" variant="block" tone="ink">
            See the Gallery
          </ArrowLink>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-12 lg:gap-6">
          {shots.map((s, i) => (
            <figure
              key={i}
              className={`poster relative aspect-[4/3] overflow-hidden [box-shadow:5px_5px_0_0_var(--gc-ink)] first:aspect-[3/4] ${s.rotate} ${s.span}`}
            >
              <img
                src={s.src}
                alt="Ground Culture, Observatory"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
